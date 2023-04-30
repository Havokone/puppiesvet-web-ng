import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './usuario/create/create.component';
import { ListComponent } from './usuario/list/list.component';
import { DetailComponent } from './usuario/detail/detail.component';
import { EditComponent } from './usuario/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    DetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
