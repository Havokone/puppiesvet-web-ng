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

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
  NGX_MAT_DATE_FORMATS
} from '@angular-material-components/datetime-picker';
import { LoginComponent } from './login/login.component';


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
    EditUsuarioComponent,

    PageNotFoundComponent,
    HomeComponent,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatNativeDateModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatDatepickerModule,
    MatTabsModule,
    MatGridListModule,

    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
