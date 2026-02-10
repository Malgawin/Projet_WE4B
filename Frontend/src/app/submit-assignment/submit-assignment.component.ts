import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, Submit } from '../class/cours';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkFileExtension } from '../validators/validator-check-extension';
import { FilesService } from '../services/files.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {

  public assignment !: Assignment
  assignForm = new FormGroup({
      file: new FormControl('', [Validators.required, checkFileExtension]),
    })
  public submit !: Submit
  private userId: number =  this.userAuthService.user?.id
  private assignementId: string |null = this.route.snapshot.paramMap.get('id_assignment')

  constructor(
    private assign_service: AssignmentService,
    private files_service: FilesService,
    private route: ActivatedRoute,
    private router: Router,
    private userAuthService : UserAuthService
  ) { }

  ngOnInit(): void {
    this.assign_service.getAssignementsById(this.assignementId).subscribe(result => {
        this.assignment = result;
      });
    this.assign_service.getSubmitByAssignmentAndUser(this.assignementId, this.userId).subscribe(submit => {this.submit = submit})
    
  }

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log('Fichier sélectionné :', file);
    this.assignForm.patchValue({ file: file });
    this.assignForm.get('file')!.updateValueAndValidity();
  }
}

  submitForm(): void {
    const file = this.assignForm.get('file')!.value;
    if (file) {
      let id_course : number = Number(this.route.snapshot.paramMap.get('id_course'));
      let fileId: string;
      this.files_service.uploadPdf(file).subscribe(result => {
        fileId = result; // Récupère l'ID du fichier PDF uploadé
          if (!this.submit){
            console.log('pas de submit : ', this.submit)
            let newSubmit : Submit = {
            userId: this.userId,
            fileId : fileId,
            grade: null,
            comment: null,
            state: "En attente"
            }
            console.log('ID assignment :', this.assignementId);
            this.assign_service.addSubmit({submit: newSubmit, id_assignment: this.assignementId}).subscribe(result => {
            console.log('Résultat de addAssignment :', result);
            });
          }
          else{
            console.log('y a un submit : ', this.submit)
            this.assign_service.updateSubmitFileId(this.assignementId, this.userId, fileId).subscribe(result => {
            console.log('fileId modifié !', result);
            });
          }
                
      });
      
      
      
      
      this.router.navigate(['cours/', id_course])
    }
  }

}
