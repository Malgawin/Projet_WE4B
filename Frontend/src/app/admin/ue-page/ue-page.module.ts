import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UePageRoutingModule } from './ue-page-routing.module';
import { UePageComponent } from './ue-page.component';
import { UeListComponent } from './ue-list/ue-list.component';
import { UeListElementComponent } from './ue-list-element/ue-list-element.component';
import { ModalCreateUeComponent } from './modal-create-ue/modal-create-ue.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalModifyUeComponent } from './modal-modify-ue/modal-modify-ue.component';
import { ModalDisplayRegisteredComponent } from './modal-display-registered/modal-display-registered.component';
import { RegisteredListElementComponent } from './registered-list-element/registered-list-element.component';



@NgModule({
  declarations: [
    UePageComponent,
    UeListComponent,
    UeListElementComponent,
    ModalCreateUeComponent,
    ModalModifyUeComponent,
    ModalDisplayRegisteredComponent,
    RegisteredListElementComponent
  ],
  imports: [
    CommonModule,
    UePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UePageModule { }
