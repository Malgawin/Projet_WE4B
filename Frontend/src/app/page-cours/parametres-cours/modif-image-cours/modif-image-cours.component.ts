import { Component, OnInit, Input } from '@angular/core';
import { Cours} from '../../../class/cours';
import { FilesService } from '../../../services/files.service';
import { CoursService } from '../../../services/cours.service';




@Component({
  selector: 'app-modif-image-cours',
  templateUrl: './modif-image-cours.component.html',
  styleUrls: ['./modif-image-cours.component.css']
})
export class ModifImageCoursComponent implements OnInit {

  @Input() cours!: Cours; // recupere le cours dont on veut modifier l'image
  newImageId?: string; // stock l'id de la nouvelle image uploader pour maj l'id dans la bdd postgresql

  constructor( private filesService: FilesService, private coursService: CoursService) { }

  ngOnInit(): void {
  }

  // Retoune l'image a afficher grace a son id'
  getImageShow(id: string): string { 
    return this.filesService.getImage(id);
  }

  // Methode pour uploader une nouvelle image
  uploadNewImage(event: Event): void {
    
    //convertit l'event en HTMLInputElement pour dire que c'est un input html
    const input = event.target as HTMLInputElement; 

    // Verifie si l'input est bien une image ( un fichier)
    if (input.files?.length) {
      
      //recupere le fichier de l'input
      const file = input.files[0];  
      
      // envoie l'image a la methode uploadImage du service filesService 
      // et souscrit a l'observable pour recuperer l'id de la nouvelle image
      this.filesService.uploadImage(file).subscribe(
        (id) => {
          this.newImageId = id; //id de la nouvelle image
        });

    } else { // Si l'input n'est pas un fichier ou est vide on fait rien
      return;
    }
  }


  // Methode pour changer l'image du cours dans postgresql
  changeImage(): void{
    if (this.newImageId) { // si l'id de la nouvelle image est defini
      // appelle la methode updateImage du service coursService pour mettre a jour l'image du cours
      this.coursService.updateImage(this.cours.id, this.newImageId).subscribe(
        ()=> {
          this.cours.image = this.newImageId!; // met a jour l'image du cours avec la nouvelle image
          this.newImageId = undefined; // remet l'id de la nouvelle image a undefined pour eviter de la changer plusieurs fois
        }
      )
    }
  }
  
}
