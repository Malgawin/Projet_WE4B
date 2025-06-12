import { Component, OnInit } from '@angular/core';
import {Modal} from "bootstrap";

@Component({
  selector: 'app-modal-modify-user',
  templateUrl: './modal-modify-user.component.html',
  styleUrls: ['./modal-modify-user.component.css']
})
export class ModalModifyUserComponent implements OnInit {
  formData = {
    name: 'Placeholder',
    familyName: 'For now'
  };
  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    console.log('Submitted:', this.formData);

    const modalEl = document.getElementById('createUserModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = { name: '', familyName: '' };
  }

}
