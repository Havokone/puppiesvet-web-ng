import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '@service/servicio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Servicio } from '@models/servicio';

@Component({
  selector: 'app-edit-servicio',
  templateUrl: './edit-servicio.component.html',
  styleUrls: ['./edit-servicio.component.css']
})
export class EditServicioComponent implements OnInit {
  servicio:Servicio = new Servicio();
  servicioForm:FormGroup;

  constructor(public formBuilder: FormBuilder,
              private servicioService: ServicioService,
              private activeRoute: ActivatedRoute,
              private router: Router){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.servicioService.getServicio(id).subscribe(data => {
      this.servicio = data;
      this.setValuesInit();
    });
  }

  ngOnInit(): void {
    this.setValuesInit();
  }

  setValuesInit(){
    this.servicioForm = this.formBuilder.group({
      nombreServicio: [this.servicio.nombreServicio,[Validators.required]],
      descripcionServicio: [this.servicio.descripcionServicio,[Validators.required]],
      estado: [{value:this.servicio.estado,disabled:false}]
    })
  }

  actualizar(){
    this.servicio.nombreServicio = this.servicioForm.value["nombreServicio"]
    this.servicio.descripcionServicio = this.servicioForm.value["descripcionServicio"]
    this.servicio.estado = this.servicioForm.value["estado"]
    this.servicioService.updateServicio(this.servicio.idServicio,this.servicio).subscribe(
      data => {this.router.navigate(['servicio/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.servicioForm.controls[controlName].hasError(errorName);
  };

}
