import {Component, EventEmitter, Output} from '@angular/core';
// @ts-ignore
import { Modal } from 'bootstrap';
import {UeFormData} from "../ue-page.component";

@Component({
  selector: 'app-modal-create-ue',
  templateUrl: './modal-create-ue.component.html',
})
export class ModalCreateUeComponent {
  formData: UeFormData = {
    code: '',
    name: '',
    description: ''
  };

  @Output() ueCreated = new EventEmitter<UeFormData>();

  submitForm() {
    this.ueCreated.emit(this.formData);

    const modalEl = document.getElementById('createUeModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = {code:'', name: '', description: '' };
  }
}

