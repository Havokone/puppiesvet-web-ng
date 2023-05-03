import { Component,OnInit } from '@angular/core';
import { Servicio } from '@models/servicio';
import { ServicioService } from '@service/servicio.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  servicios: Servicio[];

  constructor(private servicioService: ServicioService){}

  ngOnInit(): void {

    this.servicioService.getServicioActiveList().subscribe(
      serviciosActive => {this.servicios = serviciosActive;})

  }
}
