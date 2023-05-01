import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Usuario } from '@models/usuario';
import { UsuarioService } from '@service/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit,AfterViewInit {

  usuario: Usuario = new Usuario();
  displayedColumns = ["idUsuario","nombreUsuario","dniUsuario","emailUsuario","celularUsuario","direccionUsuario","rol","estado","opciones"]
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private usuarioService: UsuarioService){
    this.usuarioService.getUsuarioList().subscribe(usuarios => {this.dataSource.data = usuarios;});
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  reloadData(){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
