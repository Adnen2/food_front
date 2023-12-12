import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Foods } from './foods';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  private apiURL = "http://localhost:5000/api/foods/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  create(foods: Foods): Observable<any> {
    return this.httpClient.post(this.apiURL + 'food', JSON.stringify(foods), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  find(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + '' + _id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  update(_id: object, foods: Foods): Observable<any> {
    return this.httpClient.put(this.apiURL + 'food/' + _id,
      JSON.stringify(foods), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  delete(_id: object) {
    return this.httpClient.delete(this.apiURL + 'food/' + _id,
      this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  uploadSignature(vals: any): Observable<any> {
    let data = vals;
    return this.httpClient.post('https://api.cloudinary.com/v1_1/iset1234/image/upload/', data)
  }
}
