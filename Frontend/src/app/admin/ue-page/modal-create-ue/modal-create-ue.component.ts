import { Component } from '@angular/core';
// @ts-ignore
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal-create-ue',
  templateUrl: './modal-create-ue.component.html',
})
export class ModalCreateUeComponent {
  formData = {
    code: '',
    name: '',
    description: ''
  };

  submitForm() {
    console.log('Submitted:', this.formData);

    const modalEl = document.getElementById('createUeModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = {code:'', name: '', description: '' };
  }
}

