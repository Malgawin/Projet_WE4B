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
  selectedCoursId: number = 0;
  nouveauTitre: string = '';

  constructor(private forumService: ForumService, private activatedroute: ActivatedRoute) {}

  
  ngOnInit(): void {
      const coursId = Number(this.activatedroute.parent?.snapshot.paramMap.get('id') || '0');
      if (coursId){
        this.selectedCoursId = coursId;
        this.forumService.getForumsByCours(coursId).subscribe(forum => {
        this.forums = forum
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
  
