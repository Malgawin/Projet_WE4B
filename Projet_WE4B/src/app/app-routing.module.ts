import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { FormCreateTextComponent } from './form-create-text/form-create-text.component';

const routes: Routes = [
  { path: 'tableau-de-bord', component: TableauDeBordComponent },
  { path: 'creation-texte', component: FormCreateTextComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
