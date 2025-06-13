import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForumService, Forum } from '../../../services/forum.service';
import { UsersService } from '../../../services/users.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  nouveauMessage: string = '';
  idLogin: number = 40; // id temporaire
  @Input() forum!: Forum;

  userNames: { [key: number]: string } = {};


  constructor(private forumService: ForumService, private usersService: UsersService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      if (this.forum && this.forum.messages) {
      const userIds = new Set<number>();
      this.forum.messages.forEach(msg => {
        if (msg.authorId) userIds.add(Number(msg.authorId));
      });
      userIds.forEach(userId => {
        this.usersService.getUserById(userId).subscribe(user => {
          this.userNames[userId] = `${user.name} ${user.familyName}`;
        });
      });
    }
  }
  
  
  getUserName(userId: number | string | undefined): string {
    if (!userId) return '';
    const id = Number(userId);
    return this.userNames[id] || '';
  }

  sendMessage() {
    if (!this.nouveauMessage.trim() || !this.forum) return;
    this.forumService.addMessage(this.forum._id, this.nouveauMessage, this.idLogin).subscribe((msg) => {
      this.forum!.messages.push(msg);
      this.nouveauMessage = '';
      this.cdr.detectChanges();
    });
    
  }

  
  dltMessage(forumId: string, messageId: string) {
    if (confirm('Voulez-vous vraiment supprimer ce message?')) {
      this.forumService.deleteMessage(forumId, messageId).subscribe(
        () => {
          this.forum.messages = this.forum.messages.filter(m => m._id !== messageId);
        }
          );
      }
    }
}
