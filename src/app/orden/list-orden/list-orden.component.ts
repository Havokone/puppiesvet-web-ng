import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Orden } from '@models/orden';
import { OrdenService } from '@service/orden.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-orden',
  templateUrl: './list-orden.component.html',
  styleUrls: ['./list-orden.component.css']
})
export class ListOrdenComponent implements OnInit,AfterViewInit {
  id:number = 0;
  isCliente:boolean = sessionStorage.getItem('rol') !=undefined && sessionStorage.getItem('rol') !=null ? sessionStorage.getItem('rol')=="C": false;
  orden: Orden = new Orden();
  displayedColumns = this.isCliente ? ["idOrden",
                      "fechaOrden",
                      "servicio","mascota",
                      "medico","atendido",
                      "estado","opciones"] :  ["idOrden",
                      "fechaOrden",
                      "servicio","mascota",
                      "cliente","atendido",
                      "estado","opciones"]
  dataSource = new MatTableDataSource<Orden>();

  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private ordenService: OrdenService){
    this.id = sessionStorage.getItem('idUsuario') !=undefined && sessionStorage.getItem('idUsuario') !=null ? Number(sessionStorage.getItem('idUsuario')): 0
    if(this.isCliente){
      this.ordenService.getOrdenActiveByClienteList(this.id).subscribe(
        ordenes => {this.dataSource.data = ordenes;});
    } else{
      this.ordenService.getOrdenActiveByAdminList(this.id).subscribe(
        ordenes => {this.dataSource.data = ordenes;});
    }

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
