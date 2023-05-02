import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RazaMascotaService } from '@service/raza-mascota.service';
import { EspecieMascotaService } from '@service/especie-mascota.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EspecieMascota } from '@models/especie-mascota';
import { RazaMascota } from '@models/raza-mascota';

@Component({
  selector: 'app-edit-raza-mascota',
  templateUrl: './edit-raza-mascota.component.html',
  styleUrls: ['./edit-raza-mascota.component.css']
})
export class EditRazaMascotaComponent implements OnInit {
  raza:RazaMascota = new RazaMascota();
  razaForm:FormGroup;
  especies: EspecieMascota[];

  constructor(public formBuilder: FormBuilder,
              private razaMascotaService: RazaMascotaService,
              private especieMascotaService: EspecieMascotaService,
              private activeRoute: ActivatedRoute,
              private router: Router){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.razaMascotaService.getRazaMascota(id).subscribe(data => {
      this.raza = data;
      console.log(data);
      this.setValuesInit();
    });
    this.especieMascotaService.getEspecieMascotaActiveList().subscribe(
      especiesActive => {this.especies = especiesActive;})
  }

  ngOnInit(): void {
    this.setValuesInit();
  }

  setValuesInit(){
    this.razaForm = this.formBuilder.group({
      nombreRazaMascota: [this.raza.nombreRazaMascota,[Validators.required]],
      descripcionRazaMascota: [this.raza.descripcionRazaMascota,[Validators.required]],
      cuidadosRazaMascota: [this.raza.cuidadosRazaMascota,[Validators.required]],
      especieMascota: [this.raza.especieMascota!=undefined ? this.raza.especieMascota.idEspecieMascota : "",[Validators.required]],
      estado: [{value:this.raza.estado,disabled:false}]
    })
  }

  actualizar(){
    this.raza.nombreRazaMascota = this.razaForm.value["nombreRazaMascota"]
    this.raza.descripcionRazaMascota = this.razaForm.value["descripcionRazaMascota"]
    this.raza.cuidadosRazaMascota = this.razaForm.value["cuidadosRazaMascota"]
    this.raza.especieMascota = new EspecieMascota()
    this.raza.especieMascota.idEspecieMascota = this.razaForm.value["especieMascota"]
    this.raza.estado = this.razaForm.value["estado"]

    this.razaMascotaService.updateRazaMascota(this.raza.idRazaMascota,this.raza).subscribe(
      data => {this.router.navigate(['raza/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.razaForm.controls[controlName].hasError(errorName);
  };

}
