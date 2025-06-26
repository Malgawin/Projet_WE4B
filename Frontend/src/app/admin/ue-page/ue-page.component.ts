import { Component, OnInit } from '@angular/core';
import {Cours} from "../../class/cours";
import {CoursService} from "../../services/cours.service";

export interface UeFormData {
  code: string;
  name: string;
  description: string;
}
@Component({
  selector: 'app-ue-page',
  templateUrl: './ue-page.component.html',
  styleUrls: ['./ue-page.component.css']
})
export class UePageComponent implements OnInit {

  ues: Cours[] = [];

  constructor(private coursService: CoursService) { }

  ngOnInit(): void {
    this.coursService.getCours().subscribe({
      next: (data) => this.ues = data,
      error: (err) => console.error('Erreur lors de la récupération des cours', err)
    });
  }

  handleUeCreated(data: UeFormData) {
    const newId = this.ues.length > 0 ? Math.max(...this.ues.map(u => u.id)) + 1 : 0;
    let newCours = new Cours(newId, data.code, data.name, data.description, "");
     // todo les images
    this.coursService.createCours(newCours).subscribe({
      error: (err) => console.error("Erreur lors de la création du cours.", err)
    });
    this.ues.push(newCours);
  }

  handleUeDeleted(coursId: number){
    if (confirm("Voulez-vous vraiment supprimer ce cours ?")){
      this.coursService.deleteCours(coursId).subscribe({
        next: () => this.ues = this.ues.filter(c => c.id !== coursId),
        error: (err) => console.error('Erreur lors de la suppression du cours : ' + coursId.toString(), err)
      });
    }
  }

  handleUeModified(id:number, data: UeFormData){
    this.coursService.updateCours(id, data).subscribe({
      error: (err) => console.error("Erreur lors de l'update du cours " + id.toString(), err)
    });
  }
}
