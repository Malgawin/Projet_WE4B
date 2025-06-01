import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService, Forum } from '../../services/forum.service';



@Component({
  selector: 'app-liste-forums-cours',
  templateUrl: './liste-forums-cours.component.html',
  styleUrls: ['./liste-forums-cours.component.css']
})
export class ForumCoursComponent implements OnInit {

  forums: Forum[] = [];
  selectedForum: Forum | null = null;
  selectedCoursId: string = '';
  nouveauTitre: string = '';

  constructor(private forumService: ForumService, private route: ActivatedRoute) {}

  
  ngOnInit(): void {
      const coursId = this.route.snapshot.paramMap.get('id');
      if (coursId){
        this.selectedCoursId = coursId;
        this.forumService.getForumsByCours(coursId).subscribe(data => {
        this.forums = data
        })
      }
  }

  selectForum(forum: Forum) {
    this.selectedForum = forum;
  }

  backToList() {
    this.selectedForum = null;
  }


  addForum() {
    const titre = this.nouveauTitre.trim();
    
    this.forumService.addForum(this.selectedCoursId, titre).subscribe(
        forum => {
          this.forums.unshift(forum);
          this.nouveauTitre = '';
        },
      );
    }

  dltForum(forumId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce forum ?')) {
      this.forumService.deleteForum(forumId).subscribe(
         () => {
          this.forums = this.forums.filter(f => f._id !== forumId);
        });
    }
  }

  

}
  
