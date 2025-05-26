  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { NavBarComponent } from './nav-bar/nav-bar.component';
  import { FormCreateTextComponent } from './form-create-text/form-create-text.component';
  import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
  import { ListeCoursCarteComponent } from './liste-cours-carte/liste-cours-carte.component';
  import { ListeCoursEtendueComponent } from './liste-cours-etendue/liste-cours-etendue.component';
import { ActiviteComponent } from './activite/activite.component';



  @NgModule({
    declarations: [
      AppComponent,
      NavBarComponent,
      FormCreateTextComponent,
      TableauDeBordComponent,
      ListeCoursCarteComponent,
      ListeCoursEtendueComponent,
      ActiviteComponent,

    ],
    imports: [
      BrowserModule,
      AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
