import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Submit } from 'src/app/class/cours';
import { AssignmentService } from 'src/app/services/assignment.service';
import { FilesService } from 'src/app/services/files.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-submits',
  templateUrl: './list-submits.component.html',
  styleUrls: ['./list-submits.component.css']
})
export class ListSubmitsComponent implements OnInit {

  SubmitArray: Submit [] = []
  userNames = new Map<number, { nom: string, prenom: string }>();

  constructor(
    private route: ActivatedRoute,
    private service: AssignmentService,
    public filesService: FilesService, // Assuming filesService is the same as assignmentService for file handling
    private usersService: UsersService,
    
  ) { }

  ngOnInit(): void {
  const assignmentIdParam = this.route.snapshot.paramMap.get('id_assignment');
  if (assignmentIdParam !== null) {
    this.service.getSubmitsByAssignment(assignmentIdParam).subscribe(result => {
      this.SubmitArray = result;
      this.SubmitArray.forEach(submit => {
        this.usersService.getUserById(submit.userId).subscribe(user => {
          this.userNames.set(submit.userId, {
            nom: user.name,
            prenom: user.familyName
          });
        });
      });
    });
  }
}

  valider() {
  const assignmentIdParam = this.route.snapshot.paramMap.get('id_assignment');
  this.service.updateAllSubmits({ id_assignment: assignmentIdParam, submits: this.SubmitArray }).subscribe({
    next: (result) => {
      // Affiche un message de succès si besoin
      console.log('Toutes les modifications ont été enregistrées', result);
    },
    error: (err) => {
      console.error('Erreur lors de la mise à jour des submits', err);
    }
  });
}

}
