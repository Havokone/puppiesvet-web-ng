import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Orden } from '@models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  URL_SERVICES = 'http://localhost:9090'
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  getOrdenList(): Observable<any> {
    return this.http.get(this.urlBase+"/orden").pipe(
      map(response => response as Orden[]),
      catchError(e => {
        alert(e.status+":"+e.error.message)
        return throwError( () => {
          const error: any = new Error(e.error.message);
          error.timestamp = Date.now();
          return error;
        });
      })
    );
  }

  getOrdenActiveByClienteList(codigo:number): Observable<any> {
    return this.http.get(this.urlBase+"/orden/cliente/"+codigo).pipe(
      map(response => response as Orden[]),
      catchError(e => {
        alert(e.status+":"+e.error.message)
        return throwError( () => {
          const error: any = new Error(e.error.message);
          error.timestamp = Date.now();
          return error;
        });
      })
    );
  }

  getOrdenActiveByAdminList(codigo:number): Observable<any> {
    return this.http.get(this.urlBase+"/orden/admin/"+codigo).pipe(
      map(response => response as Orden[]),
      catchError(e => {
        alert(e.status+":"+e.error.message)
        return throwError( () => {
          const error: any = new Error(e.error.message);
          error.timestamp = Date.now();
          return error;
        });
      })
    );
  }

  createOrden(orden: Object): Observable<Object>{
    return this.http.post(this.urlBase+"/orden", orden,{headers: this.httpHeaders});
  }
  getOrden(codigo:number):Observable<Orden>{
    return this.http.get<Orden>(this.urlBase+"/orden/"+codigo).pipe(
      map(response => response as Orden)
    )
  }
  updateOrden(codigo:number,orden: Object): Observable<Object>{
    return this.http.put(this.urlBase+"/orden/"+codigo, orden,{headers: this.httpHeaders});
  }
}
