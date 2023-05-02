import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-mascota',
  templateUrl: './edit-mascota.component.html',
  styleUrls: ['./edit-mascota.component.css']
})
export class EditMascotaComponent implements OnInit {
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
              private activeRoute: ActivatedRoute,
              private router: Router){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.mascotaService.getMascota(id).subscribe(data => {
      this.mascota = data;
      this.setValuesInit();
    });
    this.especieMascotaService.getEspecieMascotaActiveList().subscribe(
      especiesActive => {this.especies = especiesActive;})
  }

  ngOnInit(): void {
    this.setValuesInit();
  }

  setValuesInit(){
    this.mascotaForm = this.formBuilder.group({
      nombreMascota: [this.mascota.nombreMascota,[Validators.required]],
      pesoMascota: [this.mascota.pesoMascota,[Validators.required,Validators.min]],
      tamanoMascota: [this.mascota.tamanoMascota,[Validators.required,Validators.min]],
      fechaNacimientoMascota: [this.mascota.fechaNacimientoMascota,[Validators.required]],
      sexoMascota: [this.mascota.sexoMascota,[Validators.required]],
      razaMascota: [this.mascota.razaMascota!=undefined ? this.mascota.razaMascota.idRazaMascota : "",[Validators.required]],
      especieMascota: [this.mascota.razaMascota!=undefined ? ( this.mascota.razaMascota.especieMascota!=undefined ? this.mascota.razaMascota.especieMascota.idEspecieMascota : "") : "",[Validators.required]],
      estado: [{value:this.mascota.estado,disabled:false}]
    })

    if(this.mascota.razaMascota!=undefined ? ( this.mascota.razaMascota.especieMascota!=undefined ) : false){
      this.onChangeRaza(this.mascota.razaMascota.especieMascota.idEspecieMascota);
    }
  }

  onChangeRaza(raza: any){
    if(raza!=undefined){
      this.razaMascotaService.getRazaMascotaByEspecieList(raza).subscribe(
        razasActive => {this.razas = razasActive;})
    } else{
      this.razas = []
    }
  }

  actualizar(){
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
    this.mascotaService.updateMascota(this.mascota.idMascota,this.mascota).subscribe(
      data => {this.router.navigate(['mascota/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.mascotaForm.controls[controlName].hasError(errorName);
  };

}
