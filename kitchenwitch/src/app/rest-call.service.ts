import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Item } from './item';
import { environment } from '../environments/environment';
import { User } from './user';
import { AccessToken } from './access-token';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class RestCallService {
  

  constructor(private http: HttpClient) { }

    // TEMPORARY.  Pull token from local storage afer login.  
  /*  httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6InVzZXIiLCJ1c2VySWQiOiI1ZDIzYWFhNDcyNDI0YzFmYjI3MDgwZTciLCJpYXQiOjE1NjUwMzk4NDR9.1NNb-0VUo9U17USdE0rh3IXa-0453TQ9RJdKx4TXLBc'
      })
    }*/

//Permanant Header Gen, gets token from local storage
httpOptions = { 
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':'bearer ' + localStorage.getItem('access_token')
  })
}

//Could have combined the next two functions and passed the list name
getPantryList(): Observable<Item[]> {
  var body = {'list': 'pantryList'}
  return this.http
    .post<Item[]>(API_URL+'/api/v1/item/itemList/', body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
}

getShoppingList(): Observable<Item[]> {
  var body = {'list': 'shoppingList'}
  return this.http
    .post<Item[]>(API_URL+'/api/v1/item/itemList/', body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
}

updateListQty(itemId: string, listQty: string, changeQty: number): Observable<Item[]> {
  var body = {};
  body[listQty] = changeQty;
  return this.http
    .put<Item[]>(API_URL+'/api/v1/item/changeItemQty/'+itemId, body, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
}

createItem(item): Observable<Item> {
  return this.http.post<Item>(API_URL + '/api/v1/item/addItem', JSON.stringify(item), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
} 
//AUTHENTICATE
authenticateUser(username:string, password:string): Observable<AccessToken> {
  console.log("authenticateUser called!");
  return this.http.post<AccessToken>(API_URL + '/api/v1/user/authenticate', {username, password})
  .pipe(
    retry(1),
    catchError(this.handleError),
    tap(res => {
      localStorage.setItem('access_token', res.body.token);
    }),
  )
} 

private handleError (error: Response | any) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}

}