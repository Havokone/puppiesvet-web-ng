import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '@service/mascota.service';
import { Mascota } from '@models/mascota';


@Component({
  selector: 'app-detail-mascota',
  templateUrl: './detail-mascota.component.html',
  styleUrls: ['./detail-mascota.component.css']
})
export class DetailMascotaComponent implements OnInit {

  mascota:Mascota = new Mascota();

  constructor(private mascotaService: MascotaService,
              private activeRoute: ActivatedRoute){
    const id = this.activeRoute.snapshot.params["codigo"];
    this.mascotaService.getMascota(id).subscribe(data => {
      this.mascota = data;
    });
  }

  ngOnInit(): void {
  }

}
