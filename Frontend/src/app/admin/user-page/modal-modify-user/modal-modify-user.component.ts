import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modal} from "bootstrap";
import {UserFormData} from "../user-page.component";
import {User} from "../../../class/user";

@Component({
  selector: 'app-modal-modify-user',
  templateUrl: './modal-modify-user.component.html',
  styleUrls: ['./modal-modify-user.component.css']
})
export class ModalModifyUserComponent implements OnInit {

  @Input() user! : User;
  @Output() modify = new EventEmitter<UserFormData>();

  formData : UserFormData = {
    name: "",
    familyName: "",
    email: "",
    ues: []
  }

  constructor() { }

  ngOnInit(): void {
    this.formData = {
      name: this.user.name,
      familyName: this.user.familyName,
      email: this.user.mail,
      ues: [] //Todo
    }
  }

  updateUserDynamically(){
    this.user.name = this.formData.name;
    this.user.familyName = this.formData.familyName;
    this.user.mail = this.formData.email;
  }

  submitForm() {
    this.updateUserDynamically();
    this.modify.emit(this.formData);

    const modalEl = document.getElementById('modifyUserModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = {
      name: this.user.name,
      familyName: this.user.familyName,
      email: this.user.mail,
      ues: [] //Todo
    }
  }

}
