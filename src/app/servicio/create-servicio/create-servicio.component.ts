import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '@service/servicio.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-servicio',
  templateUrl: './create-servicio.component.html',
  styleUrls: ['./create-servicio.component.css']
})
export class CreateServicioComponent {

  servicioForm:FormGroup;

  constructor(public formBuilder: FormBuilder,
      private servicioService: ServicioService,
      private router: Router){}

  ngOnInit(): void {
    this.servicioForm = this.formBuilder.group({
      nombreServicio: ['',[Validators.required]],
      descripcionServicio: ['',[Validators.required]],
      estado: [{value:true,disabled:true}]
    })
  }

  guardar(){
    this.servicioService.createServicio(this.servicioForm.value).subscribe(
      data => {this.router.navigate(['servicio/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.servicioForm.controls[controlName].hasError(errorName);
  };

}
