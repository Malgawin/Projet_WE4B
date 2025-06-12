import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/class/cours';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  PostArray : Post[] = []

  constructor() { }
  
  ngOnInit(): void {
  }

}
