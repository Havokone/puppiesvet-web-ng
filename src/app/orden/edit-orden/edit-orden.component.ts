import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-orden',
  templateUrl: './edit-orden.component.html',
  styleUrls: ['./edit-orden.component.css']
})
export class EditOrdenComponent implements OnInit {
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
              private activeRoute: ActivatedRoute,
              private router: Router){
    this.isCliente = sessionStorage.getItem('rol') !=undefined && sessionStorage.getItem('rol') !=null ? sessionStorage.getItem('rol')=="C": false
    this.id_usuario = sessionStorage.getItem('idUsuario') !=undefined && sessionStorage.getItem('idUsuario') !=null ? Number(sessionStorage.getItem('idUsuario')): 0

    const id = this.activeRoute.snapshot.params["codigo"];
    this.ordenService.getOrden(id).subscribe(data => {
      this.orden = data;
      this.setValuesInit();

      if(this.isCliente){
        this.mascotaService.getMascotaByOwnerList(this.id_usuario).subscribe(
          mascotasActive => {this.mascotas = mascotasActive;})
      } else{
        this.mascotaService.getMascotaByOwnerList(this.orden.mascota.usuario.idUsuario).subscribe(
          mascotasActive => {this.mascotas = mascotasActive;})
      }

    });

    this.usuarioService.getUsuarioActiveByRolList("A").subscribe(
      veterinariosActive => {this.veterinarios = veterinariosActive;})
    this.servicioService.getServicioActiveList().subscribe(
      serviciosActive => {this.servicios = serviciosActive;})

  }

  ngOnInit(): void {
    this.setValuesInit();
  }

  setValuesInit(){
    if(!this.isCliente){
      this.ordenForm = this.formBuilder.group({
        notaOrdenCliente: [{value:this.orden.notaOrdenCliente,disabled:true},[Validators.required]],
        notaOrdenMedico: [this.orden.notaOrdenMedico,[Validators.required]],
        costoOrden: [this.orden.costoOrden,[Validators.required,Validators.min]],
        fechaOrden: [this.orden.fechaOrden,[Validators.required]],
        mascota: [{value:this.orden.mascota!=undefined ? this.orden.mascota.idMascota : "",disabled:true},[Validators.required]],
        servicio: [{value:this.orden.servicio!=undefined ? this.orden.servicio.idServicio : "",disabled:true},[Validators.required]],
        usuario: [{value:this.orden.usuario!=undefined ? this.orden.usuario.idUsuario : "",disabled:true},[Validators.required]],
        estado: [{value:this.orden.estado,disabled:false}]
      })
    } else{
      this.ordenForm = this.formBuilder.group({
        notaOrdenCliente: [this.orden.notaOrdenCliente,[Validators.required]],
        fechaOrden: [this.orden.fechaOrden,[Validators.required]],
        mascota: [this.orden.mascota!=undefined ? this.orden.mascota.idMascota : "",[Validators.required]],
        servicio: [this.orden.servicio!=undefined ? this.orden.servicio.idServicio : "",[Validators.required]],
        usuario: [this.orden.usuario!=undefined ? this.orden.usuario.idUsuario : "",[Validators.required]],
        estado: [{value:this.orden.estado,disabled:false}]
      })
    }

  }

  actualizar(){
    if(!this.isCliente){
      this.orden.notaOrdenMedico = this.ordenForm.value["notaOrdenMedico"]
      this.orden.costoOrden = this.ordenForm.value["costoOrden"]
      this.orden.fechaOrden = this.ordenForm.value["fechaOrden"]
      this.orden.estado = this.ordenForm.value["estado"]
    } else{
      this.orden.notaOrdenCliente = this.ordenForm.value["notaOrdenCliente"]
      this.orden.fechaOrden = this.ordenForm.value["fechaOrden"]
      this.orden.mascota = new Mascota()
      this.orden.mascota.idMascota = this.ordenForm.value["mascota"]

      this.orden.servicio = new Servicio()
      this.orden.servicio.idServicio = this.ordenForm.value["servicio"]

      this.orden.usuario = new Usuario()
      this.orden.usuario.idUsuario = this.ordenForm.value["usuario"]

      this.orden.estado = this.ordenForm.value["estado"]
    }

    this.ordenService.updateOrden(this.orden.idOrden,this.orden).subscribe(
      data => {this.router.navigate(['orden/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.ordenForm.controls[controlName].hasError(errorName);
  };

}
