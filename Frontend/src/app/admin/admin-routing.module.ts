import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'user', loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule) },
      { path: 'ue', loadChildren: () => import('./ue-page/ue-page.module').then(m => m.UePageModule) },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
