import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.css']
})
export class PostCreationComponent implements OnInit {

  public isText: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  isTextCreation(): void {
    this.isText = true;
  }

  isRepoCreation(): void {
    this.isText = false;
  }
}
