import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Mascota } from '@models/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  URL_SERVICES = 'http://localhost:9090'
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  getMascotaList(): Observable<any> {
    return this.http.get(this.urlBase+"/mascota").pipe(
      map(response => response as Mascota[]),
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
  getMascotaByOwnerList(codigo:number): Observable<any> {
    return this.http.get(this.urlBase+"/mascota/usuario/"+codigo).pipe(
      map(response => response as Mascota[]),
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
  createMascota(mascota: Object): Observable<Object>{
    return this.http.post(this.urlBase+"/mascota", mascota,{headers: this.httpHeaders});
  }
  getMascota(codigo:number):Observable<Mascota>{
    return this.http.get<Mascota>(this.urlBase+"/mascota/"+codigo).pipe(
      map(response => response as Mascota)
    )
  }
  updateMascota(codigo:number,mascota: Object): Observable<Object>{
    return this.http.put(this.urlBase+"/mascota/"+codigo, mascota,{headers: this.httpHeaders});
  }
}
