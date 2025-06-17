import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/class/cours';
import { Cours } from 'src/app/class/cours';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  PostArray: Post[] = []

  constructor(
    private service: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const courseIdParam = this.route.parent?.snapshot.paramMap.get('id')!;
    if (courseIdParam !== null) {
      const courseId = Number(courseIdParam); // conversion en nombre si besoin
      this.service.getPostsbyCourseId(courseId).subscribe(result => {
        this.PostArray = result;
      });
    }
    // this.cours.nbPostsTotal = this.PostArray.length; // ###### a adatper et changer d'endroit si necesaire pour la progression stocker dans cours le nombre de posts total
  }
}
