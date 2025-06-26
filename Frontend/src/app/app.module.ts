import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';




import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormCreateTextComponent } from './post-creation/form-create-text/form-create-text.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { ListeCoursCarteComponent } from './tableau-de-bord/liste-cours-carte/liste-cours-carte.component';
import { ActiviteComponent } from './tableau-de-bord/activite/activite.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreateRepositoryComponent } from './post-creation/form-create-repository/form-create-repository.component';
import { CarteCoursComponent } from './tableau-de-bord/liste-cours-carte/carte-cours/carte-cours.component';
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
import { UserPageModule } from './admin/user-page/user-page.module';
import { ParticipantsDetailsComponent } from './page-cours/participants-details/participants-details.component';
import { InfoGeneralComponent } from './page-cours/participants-details/participants-details/info-general/info-general.component';
import { ActiviteGeneralComponent } from './page-cours/participants-details/participants-details/activite-general/activite-general.component';
import { ActiviteCoursComponent } from './page-cours/participants-details/participants-details/activite-cours/activite-cours.component';
import { JournalActiviteCoursComponent } from './page-cours/participants-details/participants-details/journal-activite-cours/journal-activite-cours.component';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { ChangePasswordComponent } from './authentification/change-password/change-password.component';
import { DateToPhrasePipe } from './pipes/date-to-phrase.pipe';
import { FormCreateAssignmentComponent } from './post-creation/form-create-assignment/form-create-assignment.component';
import { AssignmentComponent } from './page-cours/course/list-posts/assignment/assignment.component';
import { SubmitAssignmentComponent } from './submit-assignment/submit-assignment.component';
import { UserTestComponent } from './user-test/user-test.component';
import { UnauthorizedComponent } from './authentification/unauthorized/unauthorized.component';


  @NgModule({
    declarations: [
      AppComponent,
      NavBarComponent,
      FormCreateTextComponent,
      TableauDeBordComponent,
      ListeCoursCarteComponent,
      ActiviteComponent,
      FormCreateRepositoryComponent,
      CarteCoursComponent,
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
      ParticipantsDetailsComponent,
      InfoGeneralComponent,
      ActiviteGeneralComponent,
      ActiviteCoursComponent,
      JournalActiviteCoursComponent,
      LoginComponent,
      RegisterComponent,
      ChangePasswordComponent,
      DateToPhrasePipe,
      FormCreateAssignmentComponent,
      AssignmentComponent,
      SubmitAssignmentComponent,
      UserTestComponent,
      UnauthorizedComponent


    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      UserPageModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth())
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
