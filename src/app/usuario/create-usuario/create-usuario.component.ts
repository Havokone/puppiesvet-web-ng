import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@service/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  roles: Rol[] = [{value: 'A',label:'Administrador'}, {value: 'C',label:'Cliente'}]

  constructor(public formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router){}

  ngOnInit(): void {
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
      rol: ['A'],
      estado: [{value:true,disabled:true}]
    })
   }

  guardar(){
    this.usuarioService.createUsuario(this.usuarioForm.value).subscribe(data => {this.router.navigate(['usuario/listar'])})
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.usuarioForm.controls[controlName].hasError(errorName);
  };

}
