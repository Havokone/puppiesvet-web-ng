import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RazaMascotaService } from '@service/raza-mascota.service';
import { RazaMascota } from '@models/raza-mascota';

@Component({
  selector: 'app-detail-raza-mascota',
  templateUrl: './detail-raza-mascota.component.html',
  styleUrls: ['./detail-raza-mascota.component.css']
})
export class DetailRazaMascotaComponent implements OnInit {

  raza_mascota:RazaMascota = new RazaMascota();

  constructor(private razaMascotaService: RazaMascotaService,
              private activeRoute: ActivatedRoute){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.razaMascotaService.getRazaMascota(id).subscribe(data => {
      this.raza_mascota = data;
    });
  }

  ngOnInit(): void {
  }

}
