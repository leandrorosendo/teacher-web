import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Disciplines } from '../models/discipline';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  private url = environment.apiUrl+'/api/disciplines';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // get all disciplines
  getDisciplines(): Observable<Disciplines[]> {
    return this.httpClient.get<Disciplines[]>(this.url) 
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // save Discipline
  saveDiscipline(list: Disciplines): Observable<Disciplines> {
    return this.httpClient.post<Disciplines>(this.url, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // update  Discipline
  updateDiscipline(list: Disciplines): Observable<Disciplines> {
    return this.httpClient.put<Disciplines>(this.url + '/' + list.id, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete Discipline
  deleteDiscipline(list: Disciplines) {
    return this.httpClient.delete<Disciplines>(this.url + '/' + list.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // erros
  handleError(error: HttpErrorResponse) {
    let errorMessage: any;
    
    if (error.error instanceof ErrorEvent) {
      // Error side client
      errorMessage = error.error.message;

    } else {
      // Erro side server
      if (error.status === 422) {
        console.log(error.error);
        let Keys = Object.keys(error.error);
        let Mensagens: any = [];
        Keys.forEach((key) => Mensagens.push(error.error[key][0]), this);
        errorMessage = { status: error.status, erro: error.error.message, mensagem: Mensagens };
      
      } else {
        errorMessage = { status: error.status, erro: error.error.message, mensagem: error.error.errors };
      }
    }

    return throwError(errorMessage);
  }; 
}
