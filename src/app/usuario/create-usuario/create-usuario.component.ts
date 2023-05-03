import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@service/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '@models/usuario';

interface Rol{
  value:String;
  label:String;
}

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})

export class CreateUsuarioComponent implements OnInit {

  usuarioForm:FormGroup;
  isAdministrador:boolean = sessionStorage.getItem('rol') !=undefined && sessionStorage.getItem('rol') !=null ? sessionStorage.getItem('rol')=="A": false;
  isCliente:boolean = sessionStorage.getItem('rol') !=undefined && sessionStorage.getItem('rol') !=null ? sessionStorage.getItem('rol')=="C": false;
  roles: Rol[] = [{value: 'A',label:'Administrador'}, {value: 'C',label:'Cliente'}]

  constructor(public formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router){}

  ngOnInit(): void {

    if(this.isCliente) {
      this.router.navigate(['home']);
    }

    this.usuarioForm = this.formBuilder.group({
      nombreUsuario: ['',[Validators.required]],
      emailUsuario: ['',[Validators.required,
                          Validators.email]],
      celularUsuario: ['',[Validators.required,
                            Validators.maxLength,
                            Validators.minLength,
                            Validators.pattern("^[0-9]*$")]],
      dniUsuario: ['',[Validators.required,
                        Validators.maxLength,
                        Validators.minLength,
                        Validators.pattern("^[0-9]*$")]],
      direccionUsuario: ['',[]],
      password: ['',[Validators.required]],
      rol: [{value:this.isAdministrador ? 'A' : 'C',disabled:!this.isAdministrador}],
      estado: [{value:true,disabled:true}]
    })
   }

  guardar(){
    if(!this.isAdministrador){
      this.usuarioForm.value["rol"] = "C"
    }
    this.usuarioService.createUsuario(this.usuarioForm.value).subscribe(
      data => {
        console.log(data)
        if(this.isAdministrador){
          this.router.navigate(['usuario/listar'])
        } else{
          sessionStorage.setItem('idUsuario',+(data as Usuario)["idUsuario"]+"");
          sessionStorage.setItem('nombreUsuario',(data as Usuario)["nombreUsuario"]);
          sessionStorage.setItem('rol',(data as Usuario)["rol"]);
          window.location.href = '/home';
        }
      })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };

}
