import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../class/cours';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { checkDate } from '../../validators/validator-check-date';
import { checkFileExtension } from '../../validators/validator-check-extension';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-form-create-repository',
  templateUrl: './form-create-repository.component.html',
  styleUrls: ['./form-create-repository.component.css']
})
export class FormCreateRepositoryComponent implements OnInit {

  repoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      publishDate: new FormControl('', [Validators.required, checkDate]),
      type: new FormControl('', Validators.required),
      file: new FormControl('', [Validators.required, checkFileExtension]),
      message: new FormControl('', Validators.required),

    })

  @Input() idLogin!: number;

  constructor(
    private service : PostService,
    private route: ActivatedRoute,
    private router: Router,
    private userAuthService : UserAuthService,
    private files_service: FilesService,
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
      const file = this.repoForm.get('file')!.value;
      let fileId: string;
      let id_course : number = Number(this.route.snapshot.paramMap.get('id'));
      this.files_service.uploadPdf(file).subscribe(result => {
        fileId = result
        console.log("File ID : ", fileId)
        let post : Post = {
          id: 0,
          title: this.repoForm.value.title!,
          type: this.repoForm.value.type!,
          message: this.repoForm.value.message!,
          publish_date: this.repoForm.value.publishDate!,
          author_id: this.userAuthService.user?.id,
          files: fileId,    
          sort_order: 11
        }
        console.log('ID du cours :', id_course);
        this.service.addPost({ post: post, ue_id: id_course }).subscribe(result => {
        console.log('Résultat de addPost :', result);
        });
      })

      this.router.navigate(['cours/', id_course])
  
    }

    onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Fichier sélectionné :', file);
      this.repoForm.patchValue({ file: file });
      this.repoForm.get('file')!.updateValueAndValidity();
    }
  }

}
