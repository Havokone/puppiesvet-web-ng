import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecieMascotaService } from '@service/especie-mascota.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EspecieMascota } from '@models/especie-mascota';

@Component({
  selector: 'app-edit-especie-mascota',
  templateUrl: './edit-especie-mascota.component.html',
  styleUrls: ['./edit-especie-mascota.component.css']
})
export class EditEspecieMascotaComponent implements OnInit {
  especie_mascota:EspecieMascota = new EspecieMascota();
  especieMascotaForm:FormGroup;

  constructor(public formBuilder: FormBuilder,
              private especieMascotaService: EspecieMascotaService,
              private activeRoute: ActivatedRoute,
              private router: Router){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.especieMascotaService.getEspecieMascota(id).subscribe(data => {
      this.especie_mascota = data;
      this.setValuesInit();
    });
  }

  ngOnInit(): void {
    this.setValuesInit();
  }

  setValuesInit(){
    this.especieMascotaForm = this.formBuilder.group({
      nombreEspecieMascota: [this.especie_mascota.nombreEspecieMascota,[Validators.required]],
      descripcionEspecieMascota: [this.especie_mascota.descripcionEspecieMascota,[Validators.required]],
      estado: [{value:this.especie_mascota.estado,disabled:false}]
    })
  }

  actualizar(){
    this.especie_mascota.nombreEspecieMascota = this.especieMascotaForm.value["nombreEspecieMascota"]
    this.especie_mascota.descripcionEspecieMascota = this.especieMascotaForm.value["descripcionEspecieMascota"]
    this.especie_mascota.estado = this.especieMascotaForm.value["estado"]
    this.especieMascotaService.updateEspecieMascota(this.especie_mascota.idEspecieMascota,this.especie_mascota).subscribe(
      data => {this.router.navigate(['especie/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.especieMascotaForm.controls[controlName].hasError(errorName);
  };
}
