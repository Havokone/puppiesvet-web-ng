import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { RazaMascota } from '@models/raza-mascota';
import { RazaMascotaService } from '@service/raza-mascota.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-raza-mascota',
  templateUrl: './list-raza-mascota.component.html',
  styleUrls: ['./list-raza-mascota.component.css']
})
export class ListRazaMascotaComponent implements OnInit,AfterViewInit {

  raza_mascota: RazaMascota = new RazaMascota();
  displayedColumns = ["idRazaMascota","nombreRazaMascota","descripcionRazaMascota","cuidadosRazaMascota","especieMascota","estado","opciones"]
  dataSource = new MatTableDataSource<RazaMascota>();

  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private razaMascotaService: RazaMascotaService){
    this.razaMascotaService.getRazaMascotaList().subscribe(razas => {this.dataSource.data = razas;});
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
