import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '@service/usuario.service';
import { Usuario } from '@models/usuario';

@Component({
  selector: 'app-detail-usuario',
  templateUrl: './detail-usuario.component.html',
  styleUrls: ['./detail-usuario.component.css']
})
export class DetailUsuarioComponent implements OnInit  {

  usuario:Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService,
              private activeRoute: ActivatedRoute){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.usuarioService.getUsuario(id).subscribe(data => {
      this.usuario = data;
    });
  }

  ngOnInit(): void {
  }

}
