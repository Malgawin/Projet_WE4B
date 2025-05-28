import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { FormCreateTextComponent } from './form-create-text/form-create-text.component';
import { FormCreateRepositoryComponent } from './form-create-repository/form-create-repository.component';
import { PageCoursComponent } from './page-cours/page-cours.component';

const routes: Routes = [
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'creation-texte', component: FormCreateTextComponent},
  { path: 'creation-depot', component: FormCreateRepositoryComponent },
  { path : 'cours/:id', component: PageCoursComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
