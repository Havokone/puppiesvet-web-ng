import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuario } from '@models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  URL_SERVICES = 'http://localhost:9090'
  private urlBase = this.URL_SERVICES + '/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getUsuarioList(): Observable<any> {

    return this.http.get(this.urlBase+"/usuario").pipe(
      map(response => response as Usuario[]),
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
  createUsuario(usuario: Object): Observable<Object>{
    return this.http.post(this.urlBase+"/usuario", usuario,{headers: this.httpHeaders});
  }
  getUsuario(codigo:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.urlBase+"/usuario/"+codigo).pipe(
      map(response => response as Usuario)
    )
  }
  updateUsuario(codigo:number,usuario: Object): Observable<Object>{
    return this.http.put(this.urlBase+"/usuario/"+codigo, usuario,{headers: this.httpHeaders});
  }
  //solo este servicio tiene este auntenticate
  autenticateUsuario(dniUsuario:string,password:string): Observable<Usuario>{
    return this.http.get<Usuario>(this.urlBase+"/usuario/dni="+dniUsuario+"&&password="+password).pipe(
      map(response => response as Usuario)
    )
  }
}
