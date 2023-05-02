import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EspecieMascota } from '@models/especie-mascota';

@Injectable({
  providedIn: 'root'
})
export class EspecieMascotaService {
  URL_SERVICES = 'http://localhost:9090'
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  getEspecieMascotaList(): Observable<any> {
    return this.http.get(this.urlBase+"/especie_mascota").pipe(
      map(response => response as EspecieMascota[]),
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
  getEspecieMascotaActiveList(): Observable<any> {
    return this.http.get(this.urlBase+"/especie_mascota_active").pipe(
      map(response => response as EspecieMascota[]),
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
  createEspecieMascota(especie_mascota: Object): Observable<Object>{
    return this.http.post(this.urlBase+"/especie_mascota", especie_mascota,{headers: this.httpHeaders});
  }
  getEspecieMascota(codigo:number):Observable<EspecieMascota>{
    return this.http.get<EspecieMascota>(this.urlBase+"/especie_mascota/"+codigo).pipe(
      map(response => response as EspecieMascota)
    )
  }
  updateEspecieMascota(codigo:number,especie_mascota: Object): Observable<Object>{
    return this.http.put(this.urlBase+"/especie_mascota/"+codigo, especie_mascota,{headers: this.httpHeaders});
  }
}
