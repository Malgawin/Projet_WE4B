import { Component, OnInit } from '@angular/core';
import { typePost } from '../class/cours';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})
export class PostCreationComponent implements OnInit {

  public postType : number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  isTextCreation(): void {
    this.postType = typePost.Text;
  }

  isRepoCreation(): void {
    this.postType = typePost.Repository;
  }

  isAssignCreation(): void {
    this.postType = typePost.Assignment;
  }
}
