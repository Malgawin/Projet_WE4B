import { Component, OnInit } from '@angular/core';
import {Modal} from "bootstrap";

@Component({
  selector: 'app-modal-modify-ue',
  templateUrl: './modal-modify-ue.component.html',
  styleUrls: ['./modal-modify-ue.component.css']
})
export class ModalModifyUeComponent implements OnInit {
  formData = {
    code: 'Placeholder',
    name: 'eeee',
    description: 'aaaa'
  };

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    console.log('Submitted:', this.formData);

    const modalEl = document.getElementById('createUeModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = {code:'', name: '', description: '' };
  }

}
