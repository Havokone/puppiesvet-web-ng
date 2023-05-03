import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Servicio } from '@models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  URL_SERVICES = 'http://localhost:9090'
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  getServicioActiveList(): Observable<any> {
    return this.http.get(this.urlBase+"/servicio_active").pipe(
      map(response => response as Servicio[]),
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
  getServicioList(): Observable<any> {
    return this.http.get(this.urlBase+"/servicio").pipe(
      map(response => response as Servicio[]),
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
  createServicio(servicio: Object): Observable<Object>{
    return this.http.post(this.urlBase+"/servicio", servicio,{headers: this.httpHeaders});
  }
  getServicio(codigo:number):Observable<Servicio>{
    return this.http.get<Servicio>(this.urlBase+"/servicio/"+codigo).pipe(
      map(response => response as Servicio)
    )
  }
  updateServicio(codigo:number,servicio: Object): Observable<Object>{
    return this.http.put(this.urlBase+"/servicio/"+codigo, servicio,{headers: this.httpHeaders});
  }
}
