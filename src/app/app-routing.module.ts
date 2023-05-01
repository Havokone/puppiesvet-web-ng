import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
/*
Index es para la página principal
Home es para la página de usuarios
*/
const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"index", component: IndexComponent},
  {path:"", redirectTo: "/index", pathMatch: "full"},

  {path:"usuario/listar", component: ListUsuarioComponent},
  {path:"usuario/registrar", component: CreateUsuarioComponent},
  {path:"usuario/ver/:codigo", component: DetailUsuarioComponent},
  {path:"usuario/editar/:codigo", component: EditUsuarioComponent},

  {path:"servicio/listar", component: ListServicioComponent},
  {path:"servicio/registrar", component: CreateServicioComponent},
  {path:"servicio/ver/:codigo", component: DetailServicioComponent},
  {path:"servicio/editar/:codigo", component: EditServicioComponent},

  {path:"especie/listar", component: ListEspecieMascotaComponent},
  {path:"especie/registrar", component: CreateEspecieMascotaComponent},
  {path:"especie/ver/:codigo", component: DetailEspecieMascotaComponent},
  {path:"especie/editar/:codigo", component: EditEspecieMascotaComponent},

  {path:"raza/listar", component: ListRazaMascotaComponent},
  {path:"raza/registrar", component: CreateRazaMascotaComponent},
  {path:"raza/ver/:codigo", component: DetailRazaMascotaComponent},
  {path:"raza/editar/:codigo", component: EditRazaMascotaComponent},

  {path:"mascota/listar", component: ListMascotaComponent},
  {path:"mascota/registrar", component: CreateMascotaComponent},
  {path:"mascota/ver/:codigo", component: DetailMascotaComponent},
  {path:"mascota/editar/:codigo", component: EditMascotaComponent},

  {path:"orden/listar", component: ListOrdenComponent},
  {path:"orden/registrar", component: CreateOrdenComponent},
  {path:"orden/ver/:codigo", component: DetailOrdenComponent},
  {path:"orden/editar/:codigo", component: EditOrdenComponent},

  {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
