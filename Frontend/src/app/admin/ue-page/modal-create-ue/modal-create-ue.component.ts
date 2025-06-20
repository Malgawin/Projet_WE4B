import {Component, EventEmitter, Output} from '@angular/core';
// @ts-ignore
import { Modal } from 'bootstrap';
import {UeFormData} from "../ue-page.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-create-ue',
  templateUrl: './modal-create-ue.component.html',
})
export class ModalCreateUeComponent {
  creationForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  get code() {
    return this.creationForm.get('code');
  }

  get name() {
    return this.creationForm.get('name');
  }

  get description() {
    return this.creationForm.get('description');
  }

  @Output() ueCreated = new EventEmitter<UeFormData>();

  submitForm() {
    const formValue = this.creationForm.value as UeFormData;

    this.ueCreated.emit(formValue);

    const modalEl = document.getElementById('createUeModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.creationForm.reset();
  }
}

