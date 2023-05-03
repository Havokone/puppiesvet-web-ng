import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@service/usuario.service';
import { Usuario } from '@models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msgLogin:string = ""
  usuarioForm:FormGroup;
  usuarios:Usuario[]

  constructor(public formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router){}

  ngOnInit(): void {

    this.usuarioForm = this.formBuilder.group({
      dniUsuario: ['',[Validators.required,
                        Validators.maxLength,
                        Validators.minLength,
                        Validators.pattern("^[0-9]*$")]],
      password: ['',[Validators.required]]
    })
    this.usuarioService.getUsuarioList().subscribe(usuarios => {this.usuarios = usuarios;});

    if(sessionStorage.getItem('nombreUsuario')!=null) {
      this.router.navigate(['home']);
    }

   }

  acceder(){
    let dniUsuario = this.usuarioForm.value["dniUsuario"]
    let password = this.usuarioForm.value["password"]
    var usuarioExists = false;
    var usuarioInactive = false;
    var allClear = false;
    var nombreUsuario ="",rol = "",idUsuario = 0;
    this.usuarios.forEach( usuario =>{
      if(usuario.dniUsuario==dniUsuario){
        usuarioExists = true;
        if(!usuario.estado){
          usuarioInactive = true;
        } else{
          if(usuario.password==password){
            allClear = true;
            nombreUsuario = usuario.nombreUsuario;
            rol = usuario.rol;
            idUsuario = usuario.idUsuario;
          } else{
            allClear = false;
          }
        }
      }
    });
    var msg = "";
    if(usuarioExists){
      if(!usuarioInactive){
        if(allClear){
          msg = "Bienvenido, " + nombreUsuario
        } else{
          msg = "La contraseña es incorrecta."
        }
      } else{
        msg = "El usuario ha sido dado de baja. Comuníquese con un administrador."
      }
    } else{
      msg = "No existe el usuario."
    }
    if(!allClear){
      this.msgLogin = msg
    } else{
      sessionStorage.setItem('idUsuario',idUsuario+"");
      sessionStorage.setItem('nombreUsuario',nombreUsuario);
      sessionStorage.setItem('rol',rol);
      window.location.reload();
    }

  }

  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };

}
