import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Persona } from '@app/shared/models/persona.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Persona[]> {
    return this.http
      .get<Persona[]>(`${environment.API_URL}/adminapp/persona`)
      .pipe(catchError(this.handlerError));
  }

  getById(personaId: number): Observable<Persona> {
    return this.http
      .get<any>(`${environment.API_URL}/adminapp/persona/${personaId}`)
      .pipe(catchError(this.handlerError));
  }

  new(persona: Persona): Observable<Persona> {
    return this.http
      .post<Persona>(`${environment.API_URL}/adminapp/persona`, persona)
      .pipe(catchError(this.handlerError));
  }

  update(personaId: number, persona: Persona): Observable<Persona> {
    return this.http
      .patch<Persona>(`${environment.API_URL}/adminapp/persona/${personaId}`, persona)
      .pipe(catchError(this.handlerError));
  }

  delete(personaId: number): Observable<{}> {
    return this.http
      .delete<Persona>(`${environment.API_URL}/adminapp/persona/${personaId}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
