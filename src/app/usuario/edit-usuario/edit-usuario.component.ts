import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '@service/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '@models/usuario';

interface Rol{
  value:String;
  label:String;
}

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {
  usuario:Usuario = new Usuario();
  usuarioForm:FormGroup;
  roles: Rol[] = [{value: 'A',label:'Administrador'}, {value: 'C',label:'Cliente'}]

  constructor(public formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private activeRoute: ActivatedRoute,
              private router: Router){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.usuarioService.getUsuario(id).subscribe(data => {
      this.usuario = data;
      this.setValuesInit();
    });


  }

  ngOnInit(): void {
    this.setValuesInit();
  }

  setValuesInit(){
    this.usuarioForm = this.formBuilder.group({
      nombreUsuario: [this.usuario.nombreUsuario,[Validators.required]],
      emailUsuario: [this.usuario.emailUsuario,[Validators.required,
                      Validators.email]],
      celularUsuario: [this.usuario.celularUsuario,[Validators.required,
                        Validators.maxLength,
                        Validators.minLength,
                        Validators.pattern("^[0-9]*$")]],
      dniUsuario: [this.usuario.dniUsuario,[Validators.required,
                    Validators.maxLength,
                    Validators.minLength,
                    Validators.pattern("^[0-9]*$")]],
      direccionUsuario: [this.usuario.direccionUsuario,[]],
      password: [this.usuario.password,[Validators.required]],
      rol: [this.usuario.rol],
      estado: [{value:this.usuario.estado,disabled:false}]
      })
  }

  actualizar(){

    this.usuario.dniUsuario = this.usuarioForm.value["dniUsuario"]
    this.usuario.nombreUsuario = this.usuarioForm.value["nombreUsuario"]
    this.usuario.emailUsuario = this.usuarioForm.value["emailUsuario"]
    this.usuario.celularUsuario = this.usuarioForm.value["celularUsuario"]
    this.usuario.direccionUsuario = this.usuarioForm.value["direccionUsuario"]
    this.usuario.password = this.usuarioForm.value["password"]
    this.usuario.rol = this.usuarioForm.value["rol"]
    this.usuario.estado = this.usuarioForm.value["estado"]
    console.log(this.usuario)
    this.usuarioService.updateUsuario(this.usuario.idUsuario,this.usuario).subscribe(data => {this.router.navigate(['usuario/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };

}
