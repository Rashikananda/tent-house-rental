import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from './models/product';
import { error } from '@angular/compiler/src/util';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string  = environment.apiUrl  ;
  constructor(private http: HttpClient) { }

  
  getProductList(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/products', httpOptions).pipe(
      catchError(this.handleError));
  }

  getInventorySummmartReport():  Observable<any> {
    return this.http.get(this.apiUrl + '/api/inventorySummary', httpOptions).pipe(
      catchError(this.handleError));
  }
  getInventoryDetailReport():  Observable<any> {
    return this.http.get(this.apiUrl + '/api/inventoryDetailed', httpOptions).pipe(
      catchError(this.handleError));
  }
  getCustomerDetails():  Observable<any> {
    return this.http.get(this.apiUrl + '/api/customers', httpOptions).pipe(
      catchError(this.handleError));
  }
  getTranscationList():  Observable<any> {
    return this.http.get(this.apiUrl + '/api/transactionList', httpOptions).pipe(
      catchError(this.handleError));
  }
  addTransaction(data: any):  Observable<any> {
    console.log(data)
    return this.http.post(this.apiUrl + '/api/addTransc',data, httpOptions).pipe(
      catchError(this.handleError));
  }
  
  // getBook(id: string): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get(url, httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError));
  // }
  
  // postBook(data): Observable<any> {
  //   return this.http.post(apiUrl, data, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  
  // updateBook(data): Observable<any> {
  //   return this.http.put(apiUrl, data, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
