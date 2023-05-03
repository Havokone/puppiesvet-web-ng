import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenService } from '@service/orden.service';
import { MascotaService } from '@service/mascota.service';
import { UsuarioService } from '@service/usuario.service';
import { ServicioService } from '@service/servicio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Orden } from '@models/orden';
import { Mascota } from '@models/mascota';
import { Usuario } from '@models/usuario';
import { Servicio } from '@models/servicio';

@Component({
  selector: 'app-create-orden',
  templateUrl: './create-orden.component.html',
  styleUrls: ['./create-orden.component.css']
})
export class CreateOrdenComponent implements OnInit {
  id_usuario:number = 0;
  isCliente:boolean = true;
  minDate:Date = new Date();
  orden:Orden = new Orden();
  ordenForm:FormGroup;
  mascotas: Mascota[];
  veterinarios: Usuario[];
  servicios: Servicio[];

  constructor(public formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private servicioService: ServicioService,
              private mascotaService: MascotaService,
              private ordenService: OrdenService,
              private router: Router){
    this.isCliente = sessionStorage.getItem('rol') !=undefined && sessionStorage.getItem('rol') !=null ? sessionStorage.getItem('rol')=="C": false
    this.id_usuario = sessionStorage.getItem('idUsuario') !=undefined && sessionStorage.getItem('idUsuario') !=null ? Number(sessionStorage.getItem('idUsuario')): 0
              }

  ngOnInit(): void {
    this.ordenForm = this.formBuilder.group({
      notaOrdenCliente: ['',[Validators.required]],
      fechaOrden: ['',[Validators.required]],
      mascota: ['',[Validators.required]],
      servicio: ['',[Validators.required]],
      usuario: ['',[Validators.required]],
      estado: [{value:true,disabled:true}]
    })
    this.usuarioService.getUsuarioActiveByRolList("A").subscribe(
      veterinariosActive => {this.veterinarios = veterinariosActive;})
    this.servicioService.getServicioActiveList().subscribe(
      serviciosActive => {this.servicios = serviciosActive;})
    this.mascotaService.getMascotaByOwnerList(this.id_usuario).subscribe(
          mascotasActive => {this.mascotas = mascotasActive;})
  }

  guardar(){
    this.orden.notaOrdenCliente = this.ordenForm.value["notaOrdenCliente"]
    this.orden.notaOrdenMedico = this.ordenForm.value["notaOrdenMedico"]
    this.orden.costoOrden = this.ordenForm.value["costoOrden"]
    this.orden.fechaOrden = this.ordenForm.value["fechaOrden"]
    this.orden.fechaOrden?.setSeconds(0)
    this.orden.mascota = new Mascota()
    this.orden.mascota.idMascota = this.ordenForm.value["mascota"]

    this.orden.servicio = new Servicio()
    this.orden.servicio.idServicio = this.ordenForm.value["servicio"]

    this.orden.usuario = new Usuario()
    this.orden.usuario.idUsuario = this.ordenForm.value["usuario"]

    this.orden.estado = this.ordenForm.value["estado"]
    this.ordenService.createOrden(this.orden).subscribe(
      data => {this.router.navigate(['orden/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.ordenForm.controls[controlName].hasError(errorName);
  };

}
