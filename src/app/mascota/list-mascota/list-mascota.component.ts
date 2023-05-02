import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Mascota } from '@models/mascota';
import { MascotaService } from '@service/mascota.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-mascota',
  templateUrl: './list-mascota.component.html',
  styleUrls: ['./list-mascota.component.css']
})
export class ListMascotaComponent implements OnInit,AfterViewInit {
  id:number = 2;
  mascota: Mascota = new Mascota();
  displayedColumns = ["idMascota","nombreMascota","fechaNacimientoMascota",
                      "sexoMascota","razaMascota",
                      "especieMascota",
                      "estado","opciones"]
  dataSource = new MatTableDataSource<Mascota>();

  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private mascotaService: MascotaService){
    this.mascotaService.getMascotaByOwnerList(this.id).subscribe(
      mascotas => {this.dataSource.data = mascotas;});
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
