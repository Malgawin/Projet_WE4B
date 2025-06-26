import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, Submit } from '../class/cours';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkFileExtension } from '../validators/validator-check-extension';
import { FilesService } from '../services/files.service';

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

  constructor(
    private assign_service: AssignmentService,
    private files_service: FilesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const assignId = this.route.snapshot.paramMap.get('id_assignment');
    this.assign_service.getAssignementsById(assignId).subscribe(result => {
        this.assignment = result;
      });
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
      let id_assignment : string | null = this.route.snapshot.paramMap.get('id_assignment');
      let fileId: string;
      this.files_service.uploadPdf(file).subscribe(result => {
        fileId = result; // Récupère l'ID du fichier PDF uploadé
        
        let submit : Submit = {
        userId: 0,
        fileId : fileId,
        grade: null,
        comment: null,
        state: "En attente"
        }
        console.log('ID assignment :', id_assignment);
        this.assign_service.addSubmit({submit, id_assignment}).subscribe(result => {
        console.log('Résultat de addAssignment :', result);
        });
      });
      
      
      
      
      this.router.navigate(['cours/', id_course])
    }
  }

}
