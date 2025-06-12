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
    
    let id_course : number = Number(this.route.snapshot.paramMap.get('id')!);
    let post : Post = {
      post_id: 0,
      author_id: 1,
      title: this.textForm.value.title!,
      type: this.textForm.value.type!,
      message: this.textForm.value.message!,
      date: this.textForm.value.publishDate!,
      file: null,
      sort_order: null,
      id_course: id_course
    }
    this.service.addPost(post)
    

  }

} 
