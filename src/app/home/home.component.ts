import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nombreUsuario:any
  rolUsuario:any
  constructor(){
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario');
    this.rolUsuario = sessionStorage.getItem('rol');
  }
}
