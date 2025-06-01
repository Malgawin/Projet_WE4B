import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForumService, Forum } from '../../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  nouveauMessage: string = '';

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
      
  }
  
  @Input() forum!: Forum;
  
  

  sendMessage() {
  if (!this.nouveauMessage.trim() || !this.forum) return;
  this.forumService.addMessage(this.forum._id, this.nouveauMessage).subscribe((msg) => {
    this.forum!.messages.push(msg);
    this.nouveauMessage = '';
  });
  }

  
  dltMessage(forumId: string, messageId: string) {

    this.forumService.deleteMessage(forumId, messageId).subscribe(
       () => {
        this.forum.messages = this.forum.messages.filter(m => m._id !== messageId);
      }
      );
  }

}
