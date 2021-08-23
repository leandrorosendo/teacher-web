import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TeacherDisciplines } from '../models/teacher-disciplines';

@Injectable({
  providedIn: 'root'
})
export class TeacherDisciplineService {

  private url = 'http://localhost:8000/api/teachers/disciplines';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // get all teacher disciplines
  getTeacherDisciplines(): Observable<TeacherDisciplines[]> {
    return this.httpClient.get<TeacherDisciplines[]>(this.url) 
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // save Teacher Discipline
  saveTeacherDiscipline(list: TeacherDisciplines): Observable<TeacherDisciplines> {
    return this.httpClient.post<TeacherDisciplines>(this.url, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // update  Teacher Discipline
  updateTeacherDiscipline(list: TeacherDisciplines): Observable<TeacherDisciplines> {
    return this.httpClient.put<TeacherDisciplines>(this.url + '/' + list.id, JSON.stringify(list), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // delete Teacher Discipline
  deleteTeacherDiscipline(list: TeacherDisciplines) {
    return this.httpClient.delete<TeacherDisciplines>(this.url + '/' + list.id, this.httpOptions)
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
