import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { PageCoursComponent } from './page-cours/page-cours.component';
import { PostCreationComponent } from './post-creation/post-creation.component';

const routes: Routes = [
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path : 'cours/:id', component: PageCoursComponent},
  { path : 'creation-cours', component: PostCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
