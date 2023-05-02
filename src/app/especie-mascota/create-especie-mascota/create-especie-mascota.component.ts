import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecieMascotaService } from '@service/especie-mascota.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-especie-mascota',
  templateUrl: './create-especie-mascota.component.html',
  styleUrls: ['./create-especie-mascota.component.css']
})
export class CreateEspecieMascotaComponent {

  especieMascotaForm:FormGroup;

  constructor(public formBuilder: FormBuilder,
      private especieMascotaService: EspecieMascotaService,
      private router: Router){}

  ngOnInit(): void {
    this.especieMascotaForm = this.formBuilder.group({
      nombreEspecieMascota: ['',[Validators.required]],
      descripcionEspecieMascota: ['',[Validators.required]],
      estado: [{value:true,disabled:true}]
    })
  }

  guardar(){
    this.especieMascotaService.createEspecieMascota(this.especieMascotaForm.value).subscribe(
      data => {this.router.navigate(['especie/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.especieMascotaForm.controls[controlName].hasError(errorName);
  };

}
