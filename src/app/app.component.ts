import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Puppies-Vet';
  nombreUsuario:any
  rolUsuario:any
  sessionExists:boolean = false
  isCliente:boolean = false
  mode = new FormControl('push' as MatDrawerMode);

  constructor(private router: Router){
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario');
    this.rolUsuario = sessionStorage.getItem('rol');
    this.sessionExists = this.nombreUsuario !=undefined && this.nombreUsuario !=null;
    this.isCliente = this.sessionExists && this.rolUsuario !=undefined && this.rolUsuario !=null && this.rolUsuario=="C";
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    sessionStorage.clear();
    window.location.href = '/index';
  }
}
