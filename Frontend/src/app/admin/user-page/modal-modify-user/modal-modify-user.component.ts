import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modal} from "bootstrap";
import {UserFormData} from "../user-page.component";
import {User} from "../../../class/user";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-modal-modify-user',
  templateUrl: './modal-modify-user.component.html',
  styleUrls: ['./modal-modify-user.component.css']
})
export class ModalModifyUserComponent implements OnInit {

  @Input() user! : User;
  @Output() modify = new EventEmitter<UserFormData>();

  roles = [
    { id: 'student', label: 'Student', db_id: 3 },
    { id: 'teacher', label: 'Teacher', db_id: 2 },
    { id: 'admin', label: 'Admin', db_id: 1 },
    { id: 'teacher-admin', label: 'Teacher & Admin', db_id: [1, 2] }
  ];
  selectedRole: string = "";

  formData : UserFormData = {
    name: "",
    familyName: "",
    email: "",
    roles: [],
    ues: []
  }

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.formData = {
      name: this.user.name,
      familyName: this.user.familyName,
      email: this.user.mail,
      roles: [],
      ues: [] //Todo
    };

    //Roles
    this.userService.getUserRolesByNormalID(this.user.id).subscribe({
      next: (r)=> this.formData.roles = r,
      error: (err) => console.error("Erreur lors de la récupération des rôles avec un l'id normal", err)
    })
    if (this.formData.roles.length === 1){
      switch (this.formData.roles[0]){
        case 1:
          this.selectedRole = "admin";
          break;
        case 2:
          this.selectedRole = "teacher";
          break;
        case 3:
          this.selectedRole = "student";
          break;
      }
    } else {
      this.selectedRole = "teacher-admin";
    }
  }

  updateUserDynamically(){
    this.user.name = this.formData.name;
    this.user.familyName = this.formData.familyName;
    this.user.mail = this.formData.email;

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
      roles: [],
      ues: [] //Todo
    }
  }

}
