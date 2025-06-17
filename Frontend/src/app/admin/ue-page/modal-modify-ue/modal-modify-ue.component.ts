import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modal} from "bootstrap";
import {UeFormData} from "../ue-page.component";
import {Cours} from "../../../class/cours";

@Component({
  selector: 'app-modal-modify-ue',
  templateUrl: './modal-modify-ue.component.html',
  styleUrls: ['./modal-modify-ue.component.css']
})
export class ModalModifyUeComponent implements OnInit {

  @Input() ue!: Cours;
  @Output() modify = new EventEmitter<UeFormData>();

  formData: UeFormData = {
    code: "",
    name: "",
    description: ""
  };

  constructor() { }

  ngOnInit(): void {
    this.formData = {
      code: this.ue.code,
      name: this.ue.name,
      description: this.ue.description
    };
  }

  updateCourseDynamically(){
    this.ue.code = this.formData.code;
    this.ue.name = this.formData.name;
    this.ue.description = this.formData.description;
  }

  submitForm() {
    this.updateCourseDynamically()

    this.modify.emit(this.formData);

    const modalEl = document.getElementById('createUeModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = {
      code: this.ue.code,
      name: this.ue.name,
      description: this.ue.description
    };
  }

}
