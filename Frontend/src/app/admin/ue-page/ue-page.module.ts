import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UePageRoutingModule } from './ue-page-routing.module';
import { UePageComponent } from './ue-page.component';
import { UeListComponent } from './ue-list/ue-list.component';
import { UeListElementComponent } from './ue-list-element/ue-list-element.component';
import { ModalCreateUeComponent } from './modal-create-ue/modal-create-ue.component';



@NgModule({
  declarations: [
    UePageComponent,
    UeListComponent,
    UeListElementComponent,
    ModalCreateUeComponent
  ],
  imports: [
    CommonModule,
    UePageRoutingModule
  ]
})
export class UePageModule { }
