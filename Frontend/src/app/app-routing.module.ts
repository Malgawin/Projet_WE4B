import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { CourseComponent } from './page-cours/course/course.component';
import { ForumCoursComponent } from './page-cours/liste-forums-cours/liste-forums-cours.component';
import { PageCoursComponent } from './page-cours/page-cours.component';
import { ParametresCoursComponent } from './page-cours/parametres-cours/parametres-cours.component';
import { ParticipantsCoursComponent } from './page-cours/participants-cours/participants-cours.component';
import { ParticipantsDetailsComponent } from './page-cours/participants-details/participants-details.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { ActiviteComponent } from './tableau-de-bord/activite/activite.component';
import { ListeCoursCarteComponent } from './tableau-de-bord/liste-cours-carte/liste-cours-carte.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { ChangePasswordComponent } from './authentification/change-password/change-password.component';
import { AuthGuard } from './auth.guard';
import { SubmitAssignmentComponent } from './submit-assignment/submit-assignment.component';
import { WorkSubmitedComponent } from './work-submited/work-submited.component';

const routes: Routes = [
  { path : 'tableau-de-bord', component: TableauDeBordComponent, canActivate: [AuthGuard], children :
              [
                { path : '', redirectTo: 'carte', pathMatch: 'full'},
                { path : 'carte', component: ListeCoursCarteComponent},
                { path : 'carte-etendue', component: ListeCoursCarteComponent},
                { path : 'activite', component: ActiviteComponent},

              ]

  },
  { path : 'cours/:id', component: PageCoursComponent, canActivate: [AuthGuard], children :
              [
                  { path : '', redirectTo: 'course', pathMatch: 'full'},
                  { path : 'course', component: CourseComponent},
                  { path : 'participants', component: ParticipantsCoursComponent},
                  { path : 'parametres', component: ParametresCoursComponent },
                  { path : 'forum' , component: ForumCoursComponent },
                  { path : 'participants/:id/details', component: ParticipantsDetailsComponent},

              ]
  },
  { path : 'creation-cours/:id', component: PostCreationComponent , canActivate: [AuthGuard]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canActivate: [AuthGuard]},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path : 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'change-password', component: ChangePasswordComponent },
  { path : 'soumission-devoir/:id_course/:id_assignment', component: SubmitAssignmentComponent},
  { path : 'travaux-rendus/:id_assignment', component: WorkSubmitedComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
