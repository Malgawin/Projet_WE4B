import {Component, EventEmitter, Input, Output} from '@angular/core';
// @ts-ignore
import { Modal } from 'bootstrap';
import {Cours} from "../../../class/cours";
import {UserFormData} from "../user-page.component";

@Component({
  selector: 'app-modal-create-user',
  templateUrl: './modal-create-user.component.html',
})
export class ModalCreateUserComponent {

  roles = [
    { id: 'student', label: 'Etudiant'},
    { id: 'teacher', label: 'Professeur'},
    { id: 'teacher-admin', label: 'Professeur Administrateur'},
    { id: 'admin', label: 'Administrateur' }
  ];
  selectedRole: string = "student";

  formData: UserFormData = {
    name: '',
    familyName: '',
    email: '',
    roles: [],
    ues: []
  };

  @Output() userCreated = new EventEmitter<UserFormData>();

  registerModal!: Modal;

  ngAfterViewInit() {
    const modalEl = document.getElementById('registerToUeModal_create');
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
    //Handle role logic
    if (this.selectedRole === "admin"){
      this.formData.roles.push(1);
    } else if (this.selectedRole === "teacher"){
      this.formData.roles.push(2);
    } else if (this.selectedRole === "student"){
      this.formData.roles.push(3);
    } else if (this.selectedRole === "teacher-admin"){
      this.formData.roles.push(1);
      this.formData.roles.push(2);
    }

    this.userCreated.emit(this.formData);

    const modalEl = document.getElementById('createUserModal');
    const modalInstance = Modal.getOrCreateInstance(modalEl!);
    modalInstance.hide();

    this.formData = { name: '', familyName: '', email: '', roles: [], ues: []};
  }

  onDeleteUE(ueId: number) {
    this.formData.ues = this.formData.ues.filter(ue => ue.id !== ueId);
  }
}

