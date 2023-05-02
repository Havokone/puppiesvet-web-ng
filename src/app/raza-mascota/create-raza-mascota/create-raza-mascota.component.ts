import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RazaMascotaService } from '@service/raza-mascota.service';
import { EspecieMascotaService } from '@service/especie-mascota.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EspecieMascota } from '@models/especie-mascota';
import { RazaMascota } from '@models/raza-mascota';

@Component({
  selector: 'app-create-raza-mascota',
  templateUrl: './create-raza-mascota.component.html',
  styleUrls: ['./create-raza-mascota.component.css']
})
export class CreateRazaMascotaComponent implements OnInit {
  raza:RazaMascota = new RazaMascota();
  razaForm:FormGroup;
  especies: EspecieMascota[];

  constructor(public formBuilder: FormBuilder,
              private razaMascotaService: RazaMascotaService,
              private especieMascotaService: EspecieMascotaService,
              private router: Router){}

  ngOnInit(): void {
    this.razaForm = this.formBuilder.group({
      nombreRazaMascota: ['',[Validators.required]],
      descripcionRazaMascota: ['',[Validators.required]],
      cuidadosRazaMascota: ['',[Validators.required]],
      especieMascota: ['',[Validators.required]],
      estado: [{value:true,disabled:true}]
    })
    this.especieMascotaService.getEspecieMascotaActiveList().subscribe(
      especiesActive => {this.especies = especiesActive;})
   }

  guardar(){
    this.raza.nombreRazaMascota = this.razaForm.value["nombreRazaMascota"]
    this.raza.descripcionRazaMascota = this.razaForm.value["descripcionRazaMascota"]
    this.raza.cuidadosRazaMascota = this.razaForm.value["cuidadosRazaMascota"]
    this.raza.especieMascota = new EspecieMascota()
    this.raza.especieMascota.idEspecieMascota = this.razaForm.value["especieMascota"]
    this.raza.estado = this.razaForm.value["estado"]

    this.razaMascotaService.createRazaMascota(this.raza).subscribe(
      data => {this.router.navigate(['raza/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.razaForm.controls[controlName].hasError(errorName);
  };

}
