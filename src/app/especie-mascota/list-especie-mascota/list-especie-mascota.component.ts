import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { EspecieMascota } from '@models/especie-mascota';
import { EspecieMascotaService } from '@service/especie-mascota.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-especie-mascota',
  templateUrl: './list-especie-mascota.component.html',
  styleUrls: ['./list-especie-mascota.component.css']
})
export class ListEspecieMascotaComponent implements OnInit,AfterViewInit {

  displayedColumns = ["idEspecieMascota","nombreEspecieMascota","descripcionEspecieMascota","estado","opciones"]
  dataSource = new MatTableDataSource<EspecieMascota>();

  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private especieMascotaService: EspecieMascotaService){
    this.especieMascotaService.getEspecieMascotaList().subscribe(especies => {this.dataSource.data = especies;});
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
