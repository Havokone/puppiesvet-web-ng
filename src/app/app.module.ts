import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListUsuarioComponent } from './usuario/list-usuario/list-usuario.component';
import { CreateUsuarioComponent } from './usuario/create-usuario/create-usuario.component';
import { DetailUsuarioComponent } from './usuario/detail-usuario/detail-usuario.component';
import { EditUsuarioComponent } from './usuario/edit-usuario/edit-usuario.component';

import { ListServicioComponent } from './servicio/list-servicio/list-servicio.component';
import { CreateServicioComponent } from './servicio/create-servicio/create-servicio.component';
import { DetailServicioComponent } from './servicio/detail-servicio/detail-servicio.component';
import { EditServicioComponent } from './servicio/edit-servicio/edit-servicio.component';

import { ListEspecieMascotaComponent } from './especie-mascota/list-especie-mascota/list-especie-mascota.component';
import { CreateEspecieMascotaComponent } from './especie-mascota/create-especie-mascota/create-especie-mascota.component';
import { DetailEspecieMascotaComponent } from './especie-mascota/detail-especie-mascota/detail-especie-mascota.component';
import { EditEspecieMascotaComponent } from './especie-mascota/edit-especie-mascota/edit-especie-mascota.component';

import { ListRazaMascotaComponent } from './raza-mascota/list-raza-mascota/list-raza-mascota.component';
import { CreateRazaMascotaComponent } from './raza-mascota/create-raza-mascota/create-raza-mascota.component';
import { DetailRazaMascotaComponent } from './raza-mascota/detail-raza-mascota/detail-raza-mascota.component';
import { EditRazaMascotaComponent } from './raza-mascota/edit-raza-mascota/edit-raza-mascota.component';

import { ListMascotaComponent } from './mascota/list-mascota/list-mascota.component';
import { CreateMascotaComponent } from './mascota/create-mascota/create-mascota.component';
import { DetailMascotaComponent } from './mascota/detail-mascota/detail-mascota.component';
import { EditMascotaComponent } from './mascota/edit-mascota/edit-mascota.component';

import { ListOrdenComponent } from './orden/list-orden/list-orden.component';
import { CreateOrdenComponent } from './orden/create-orden/create-orden.component';
import { DetailOrdenComponent } from './orden/detail-orden/detail-orden.component';
import { EditOrdenComponent } from './orden/edit-orden/edit-orden.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListOrdenComponent,
    CreateOrdenComponent,
    DetailOrdenComponent,
    EditOrdenComponent,
    ListServicioComponent,
    CreateServicioComponent,
    DetailServicioComponent,
    EditServicioComponent,
    ListMascotaComponent,
    CreateMascotaComponent,
    DetailMascotaComponent,
    EditMascotaComponent,
    ListRazaMascotaComponent,
    CreateRazaMascotaComponent,
    DetailRazaMascotaComponent,
    EditRazaMascotaComponent,
    ListEspecieMascotaComponent,
    CreateEspecieMascotaComponent,
    DetailEspecieMascotaComponent,
    EditEspecieMascotaComponent,
    ListUsuarioComponent,
    CreateUsuarioComponent,
    DetailUsuarioComponent,
    EditUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
