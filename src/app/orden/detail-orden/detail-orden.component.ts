import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenService } from '@service/orden.service';
import { Orden } from '@models/orden';

@Component({
  selector: 'app-detail-orden',
  templateUrl: './detail-orden.component.html',
  styleUrls: ['./detail-orden.component.css']
})
export class DetailOrdenComponent implements OnInit {

  orden:Orden = new Orden();

  isCliente:boolean = true;

  constructor(private ordenService: OrdenService,
              private activeRoute: ActivatedRoute){
    this.isCliente = sessionStorage.getItem('rol') !=undefined && sessionStorage.getItem('rol') !=null ? sessionStorage.getItem('rol')=="C": false
    const id = this.activeRoute.snapshot.params["codigo"];
    this.ordenService.getOrden(id).subscribe(data => {
      this.orden = data;
    });
  }

  ngOnInit(): void {
  }

}
