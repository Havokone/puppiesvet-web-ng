import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Servicio } from '@models/servicio';
import { ServicioService } from '@service/servicio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-servicio',
  templateUrl: './list-servicio.component.html',
  styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent implements OnInit,AfterViewInit {

  displayedColumns = ["idServicio","nombreServicio","descripcionServicio","estado","opciones"]
  dataSource = new MatTableDataSource<Servicio>();

  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private servicioService: ServicioService){
    this.servicioService.getServicioList().subscribe(servicios => {this.dataSource.data = servicios;});
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
