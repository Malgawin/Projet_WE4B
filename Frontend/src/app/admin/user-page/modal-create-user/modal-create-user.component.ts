import { Component } from '@angular/core';
// @ts-ignore
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
})
export class ModalCreateUserComponent {
  formData = {
    name: '',
    familyName: ''
  };
  registerModal!: Modal;

  ngAfterViewInit() {
    const modalEl = document.getElementById('registerToUeModal');
    if (modalEl) {
      this.registerModal = new Modal(modalEl);
    }
  }

  openNestedModal() {
    this.registerModal?.show();
  }

  submitForm() {
    console.log('Submitted:', this.formData);

    const modalEl = document.getElementById('createUserModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = { name: '', familyName: '' };
  }
}

