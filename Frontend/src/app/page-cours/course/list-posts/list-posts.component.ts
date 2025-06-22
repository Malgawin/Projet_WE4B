import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment, Post } from 'src/app/class/cours';
import { AssignmentService } from 'src/app/services/assignment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  PostArray: Post[] = []
  AssignmentArray: Assignment[] = []

  constructor(
    private postService: PostService,
    private assignService: AssignmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const courseIdParam = this.route.parent?.snapshot.paramMap.get('id')!;
    if (courseIdParam !== null) {
      const courseId = Number(courseIdParam); // conversion en nombre si besoin
      this.postService.getPostsbyCourseId(courseId).subscribe(result => {
        this.PostArray = result;
      });

      this.assignService.getAssignementsByCours(courseId).subscribe(result => {
        this.AssignmentArray = result;
      });
    }
    // this.cours.nbPostsTotal = this.PostArray.length; // ###### a adatper et changer d'endroit si necesaire pour la progression stocker dans cours le nombre de posts total
  }
}
