import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../class/cours';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-create-text',
  templateUrl: './form-create-text.component.html',
  styleUrls: ['./form-create-text.component.css']
})
export class FormCreateTextComponent implements OnInit {

  textForm = new FormGroup({
  title: new FormControl(''),
  publishDate: new FormControl(''),
  type: new FormControl(''),
  message: new FormControl(''),
    
  })

  constructor(
    private service : PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    
    let id_course : number = Number(this.route.snapshot.paramMap.get('id'));
    let post : Post = {
      id: 0,
      title: this.textForm.value.title!,
      type: this.textForm.value.type!,
      message: this.textForm.value.message!,
      publish_date: this.textForm.value.publishDate!,
      author_id: 77,
      files: null,    
      sort_order: 11
    }
    console.log('ID du cours :', id_course);
    this.service.addPost({ post: post, ue_id: id_course }).subscribe(result => {
    console.log('Résultat de addPost :', result);
    });

  }

} 
