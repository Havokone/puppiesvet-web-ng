import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspecieMascotaService } from '@service/especie-mascota.service';
import { EspecieMascota } from '@models/especie-mascota';

@Component({
  selector: 'app-detail-especie-mascota',
  templateUrl: './detail-especie-mascota.component.html',
  styleUrls: ['./detail-especie-mascota.component.css']
})
export class DetailEspecieMascotaComponent {

  especie_mascota:EspecieMascota = new EspecieMascota();

  constructor(private especieMascotaService: EspecieMascotaService,
              private activeRoute: ActivatedRoute){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.especieMascotaService.getEspecieMascota(id).subscribe(data => {
      this.especie_mascota = data;
    });
  }

  ngOnInit(): void {
  }

}
