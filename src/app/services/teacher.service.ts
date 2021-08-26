import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Teachers } from '../models/teacher';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private url = environment.apiUrl+'/api/teachers';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // get all teachers
  getTeachers(): Observable<Teachers[]> {
    return this.httpClient.get<Teachers[]>(this.url) 
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // save teacher
  saveTeacher(list: Teachers): Observable<Teachers> {
    return this.httpClient.post<Teachers>(this.url, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // update  teacher
  updateTeacher(list: Teachers): Observable<Teachers> {
    return this.httpClient.put<Teachers>(this.url + '/' + list.id, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete teacher
  deleteTeacher(list: Teachers) {
    return this.httpClient.delete<Teachers>(this.url + '/' + list.id, this.httpOptions)
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