import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RazaMascota } from '@models/raza-mascota';

@Injectable({
  providedIn: 'root'
})
export class RazaMascotaService {
  URL_SERVICES = 'http://localhost:9090'
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  getRazaMascotaList(): Observable<any> {
    return this.http.get(this.urlBase+"/raza_mascota").pipe(
      map(response => response as RazaMascota[]),
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
  getRazaMascotaByEspecieList(codigo:any): Observable<any> {
    return this.http.get(this.urlBase+"/raza_mascota/especie/"+codigo).pipe(
      map(response => response as RazaMascota[]),
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
  createRazaMascota(raza_mascota: Object): Observable<Object>{
    return this.http.post(this.urlBase+"/raza_mascota", raza_mascota,{headers: this.httpHeaders});
  }
  getRazaMascota(codigo:number):Observable<RazaMascota>{
    return this.http.get<RazaMascota>(this.urlBase+"/raza_mascota/"+codigo).pipe(
      map(response => response as RazaMascota)
    )
  }
  updateRazaMascota(codigo:number,raza_mascota: Object): Observable<Object>{
    return this.http.put(this.urlBase+"/raza_mascota/"+codigo, raza_mascota,{headers: this.httpHeaders});
  }
}
