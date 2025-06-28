import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../class/user";
import {CoursService} from "../../../services/cours.service";
import {Inscrit} from "../../../class/cours";

@Component({
  selector: 'app-modal-display-registered',
  templateUrl: './modal-display-registered.component.html',
  styleUrls: ['./modal-display-registered.component.css']
})
export class ModalDisplayRegisteredComponent implements OnInit {

  @Input() courseId!: number;
  @Input() courseName!: string;

  registered: User[] = [];

  constructor(private coursesServices: CoursService) { }

  ngOnInit(): void {
    this.coursesServices.getInscrits(this.courseId).subscribe({
      next: (data) => this.convertInscritToUser(data),
      error: (err) => console.error('Erreur lors de la récupération des inscrits', err)
    });
  }

  handleEvent(regId: number) {
    this.registered = this.registered.filter(reg => reg.id !== regId);
  }

  private convertInscritToUser(data: Inscrit[]) {
    for (let inscrit of data){
      this.registered.push(new User(
        inscrit.id,
        inscrit.name,
        inscrit.familyName,
        inscrit.mail
      ))
    }
  }
}
