import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UePageComponent} from "./ue-page.component";

const routes: Routes = [
  { path: '', component: UePageComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UePageRoutingModule { }
