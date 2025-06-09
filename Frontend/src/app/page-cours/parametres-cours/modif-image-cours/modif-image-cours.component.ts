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

  constructor( private filesService: FilesService) { }

  ngOnInit(): void {
  }

  getImagerUrl(): string {
    return this.filesService.getImage(this.cours.image);
  }

}
