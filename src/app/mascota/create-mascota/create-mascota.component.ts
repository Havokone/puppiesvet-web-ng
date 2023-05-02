import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotaService } from '@service/mascota.service';
import { RazaMascotaService } from '@service/raza-mascota.service';
import { EspecieMascotaService } from '@service/especie-mascota.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mascota } from '@models/mascota';
import { RazaMascota } from '@models/raza-mascota';
import { EspecieMascota } from '@models/especie-mascota';
import { Usuario } from '@models/usuario';

interface Sexo{
  value:String;
  label:String;
}

@Component({
  selector: 'app-create-mascota',
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.css']
})
export class CreateMascotaComponent implements OnInit {
  id:number = 2;
  mascota:Mascota = new Mascota();
  mascotaForm:FormGroup;
  especies: EspecieMascota[];
  razas: RazaMascota[];
  sexos: Sexo[] = [{value: 'M',label:'Macho'}, {value: 'H',label:'Hembra'}]

  constructor(public formBuilder: FormBuilder,
              private razaMascotaService: RazaMascotaService,
              private especieMascotaService: EspecieMascotaService,
              private mascotaService: MascotaService,
              private router: Router){}

  ngOnInit(): void {
    this.mascotaForm = this.formBuilder.group({
      nombreMascota: ['',[Validators.required]],
      pesoMascota: ['',[Validators.required,Validators.min]],
      tamanoMascota: ['',[Validators.required,Validators.min]],
      fechaNacimientoMascota: ['',[Validators.required]],
      sexoMascota: ['',[Validators.required]],
      razaMascota: ['',[Validators.required]],
      especieMascota: ['',[Validators.required]],
      estado: [{value:true,disabled:true}]
    })
    this.especieMascotaService.getEspecieMascotaActiveList().subscribe(
      especiesActive => {this.especies = especiesActive;})
  }

  onChangeRaza(raza: any){
    if(raza!=undefined){
      console.log(raza)
      this.razaMascotaService.getRazaMascotaByEspecieList(raza).subscribe(
        razasActive => {this.razas = razasActive;})
    } else{
      console.log("undefined")
      this.razas = []
    }
  }

  guardar(){
    this.mascota.nombreMascota = this.mascotaForm.value["nombreMascota"]
    this.mascota.pesoMascota = this.mascotaForm.value["pesoMascota"]
    this.mascota.tamanoMascota = this.mascotaForm.value["tamanoMascota"]
    this.mascota.fechaNacimientoMascota = this.mascotaForm.value["fechaNacimientoMascota"]
    this.mascota.sexoMascota = this.mascotaForm.value["sexoMascota"]
    this.mascota.razaMascota = new RazaMascota()
    this.mascota.razaMascota.idRazaMascota = this.mascotaForm.value["razaMascota"]
    this.mascota.usuario = new Usuario()
    this.mascota.usuario.idUsuario = this.id
    this.mascota.estado = this.mascotaForm.value["estado"]
    this.mascotaService.createMascota(this.mascota).subscribe(
      data => {this.router.navigate(['mascota/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.mascotaForm.controls[controlName].hasError(errorName);
  };

}
