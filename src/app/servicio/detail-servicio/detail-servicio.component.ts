import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '@service/servicio.service';
import { Servicio } from '@models/servicio';

@Component({
  selector: 'app-detail-servicio',
  templateUrl: './detail-servicio.component.html',
  styleUrls: ['./detail-servicio.component.css']
})
export class DetailServicioComponent {

  servicio:Servicio = new Servicio();

  constructor(private servicioService: ServicioService,
              private activeRoute: ActivatedRoute){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.servicioService.getServicio(id).subscribe(data => {
      this.servicio = data;
    });
  }

  ngOnInit(): void {
  }

}
