import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserListElementComponent } from './user-list-element/user-list-element.component';
import { UserPageComponent } from './user-page.component';
import { UserPageRoutingModule } from './user-page-routing.module';
import { ModalCreateUserComponent } from './modal-create-user/modal-create-user.component';
import { FormsModule } from '@angular/forms';
import { ModalModifyUserComponent } from './modal-modify-user/modal-modify-user.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserListElementComponent,
    UserPageComponent,
    ModalCreateUserComponent,
    ModalModifyUserComponent
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    FormsModule
  ]
})
export class UserPageModule { }
