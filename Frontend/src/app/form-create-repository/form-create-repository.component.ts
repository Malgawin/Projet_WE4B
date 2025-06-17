import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../class/cours';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { checkDate } from '../validators/validator-check-date';
import { checkFileExtension } from '../validators/validator-check-extension';

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

  constructor(
    private service : PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
      
      let id_course : number = Number(this.route.snapshot.paramMap.get('id'));
      let post : Post = {
        id: 0,
        title: this.repoForm.value.title!,
        type: this.repoForm.value.type!,
        message: this.repoForm.value.message!,
        publish_date: this.repoForm.value.publishDate!,
        author_id: 77,
        files: this.repoForm.value.file!,    
        sort_order: 11
      }
      console.log('ID du cours :', id_course);
      this.service.addPost({ post: post, ue_id: id_course }).subscribe(result => {
      console.log('Résultat de addPost :', result);
      });

      this.router.navigate(['cours/', id_course])
  
    }

}
