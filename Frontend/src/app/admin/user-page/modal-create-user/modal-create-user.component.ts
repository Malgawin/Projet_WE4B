import {Component, EventEmitter, Output} from '@angular/core';
// @ts-ignore
import { Modal } from 'bootstrap';
import {User} from "../../../class/user";
import {Cours} from "../../../class/cours";
import {UserFormData} from "../user-page.component";

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
})
export class ModalCreateUserComponent {

  formData: UserFormData = {
    name: '',
    familyName: '',
    email: '',
    ues: []
  };

  @Output() userCreated = new EventEmitter<UserFormData>();

  registerModal!: Modal;

  ngAfterViewInit() {
    const modalEl = document.getElementById('registerToUeModal');
    if (modalEl) {
      this.registerModal = new Modal(modalEl);
    }
  }

  registerToUe(ues: Cours[]){
    this.formData.ues = ues;
  }

  openNestedModal() {
    this.registerModal?.show();
  }

  submitForm() {
    this.userCreated.emit(this.formData);

    const modalEl = document.getElementById('createUserModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = { name: '', familyName: '', email: '', ues: []};
  }

  onDeleteUE(ueId: number) {
    this.formData.ues = this.formData.ues.filter(ue => ue.id !== ueId);
  }
}

