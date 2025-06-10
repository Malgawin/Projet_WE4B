import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { PageCoursComponent } from './page-cours/page-cours.component';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { ParticipantsCoursComponent } from './page-cours/participants-cours/participants-cours.component'
import { ParametresCoursComponent } from './page-cours/parametres-cours/parametres-cours.component'
import { ForumCoursComponent } from './page-cours/liste-forums-cours/liste-forums-cours.component'
import { CourseComponent } from './page-cours/course/course.component'
import { ParticipantsDetailsComponent } from './page-cours/participants-details/participants-details.component'

const routes: Routes = [
  { path : 'tableau-de-bord', component: TableauDeBordComponent },
  { path : 'cours/:id', component: PageCoursComponent, children :
              [   
                  { path : '', redirectTo: 'course', pathMatch: 'full'},
                  { path : 'course', component: CourseComponent},
                  { path : 'participants', component: ParticipantsCoursComponent},
                  { path : 'parametres', component: ParametresCoursComponent },
                  { path : 'forum' , component: ForumCoursComponent },
                  { path : 'participants/:id/details', component: ParticipantsDetailsComponent}
  
              ]   
  },
  { path : 'creation-cours/:id', component: PostCreationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
