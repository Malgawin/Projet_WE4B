import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormCreateTextComponent } from './form-create-text/form-create-text.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { ListeCoursCarteComponent } from './tableau-de-bord/liste-cours-carte/liste-cours-carte.component';
import { ListeCoursEtendueComponent } from './tableau-de-bord/liste-cours-etendue/liste-cours-etendue.component';
import { ActiviteComponent } from './tableau-de-bord/activite/activite.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreateRepositoryComponent } from './form-create-repository/form-create-repository.component';
import { CarteCoursComponent } from './tableau-de-bord/liste-cours-carte/carte-cours/carte-cours.component';
import { CarteCoursEtendueComponent } from './tableau-de-bord/liste-cours-etendue/carte-cours-etendue/carte-cours-etendue.component';
import { PageCoursComponent } from './page-cours/page-cours.component';
import { ParticipantsCoursComponent } from './page-cours/participants-cours/participants-cours.component';
import { ForumCoursComponent } from './page-cours/liste-forums-cours/liste-forums-cours.component';
import { ForumComponent } from './page-cours/liste-forums-cours/forum/forum.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { CourseComponent } from './page-cours/course/course.component';
import { ListPostsComponent } from './page-cours/course/list-posts/list-posts.component';
import { PostComponent } from './page-cours/course/list-posts/post/post.component';
import { ParticipantsFiltreComponent } from './page-cours/participants-cours/participants-filtre/participants-filtre.component';
import { ParticipantsListeComponent } from './page-cours/participants-cours/participants-liste/participants-liste.component';
import { ParticipantsAddUserComponent } from './page-cours/participants-cours/participants-add-user/participants-add-user.component';
import { FiltreSearchComponent } from './page-cours/participants-cours/participants-filtre/filtre-search/filtre-search.component';
import { ParametresCoursComponent } from './page-cours/parametres-cours/parametres-cours.component';
import { ModifImageCoursComponent } from './page-cours/parametres-cours/modif-image-cours/modif-image-cours.component';
import { ParticipantsDetailsComponent } from './page-cours/participants-cours/participants-details/participants-details.component';



  @NgModule({
    declarations: [
      AppComponent,
      NavBarComponent,
      FormCreateTextComponent,
      TableauDeBordComponent,
      ListeCoursCarteComponent,
      ListeCoursEtendueComponent,
      ActiviteComponent,
      FormCreateRepositoryComponent,
      CarteCoursComponent,
      CarteCoursEtendueComponent,
      PageCoursComponent,
      ParticipantsCoursComponent,
      ForumCoursComponent,
      ForumComponent,
      PostCreationComponent,
      CourseComponent,
      ListPostsComponent,
      PostComponent,
      ParticipantsFiltreComponent,
      ParticipantsListeComponent,
      ParticipantsAddUserComponent,
      FiltreSearchComponent,
      ParametresCoursComponent,
      ModifImageCoursComponent,
      ParticipantsDetailsComponent,


    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
