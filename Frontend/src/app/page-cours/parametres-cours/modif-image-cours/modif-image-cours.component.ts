import { Component, OnInit, Input } from '@angular/core';
import { Cours} from '../../../class/cours';
import { FilesService } from '../../../services/files.service';

@Component({
  selector: 'app-modif-image-cours',
  templateUrl: './modif-image-cours.component.html',
  styleUrls: ['./modif-image-cours.component.css']
})
export class ModifImageCoursComponent implements OnInit {

  @Input() cours!: Cours;
  newImageId?: string;

  constructor( private filesService: FilesService) { }

  ngOnInit(): void {
  }

  getImagerUrl(id: string): string {
    return this.filesService.getImage(id);
  }

  uploadNewImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      
      const file = input.files[0];
 
      this.filesService.uploadImage(file).subscribe(
        (id) => {
          this.newImageId = id; //id nouvelle image
        });
    } else {
      return;
    }
  }
  
}
