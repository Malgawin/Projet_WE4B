import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { CoursService} from '../../../services/cours.service';
import { User } from '../../../class/user';

@Component({
  selector: 'app-participants-add-user',
  templateUrl: './participants-add-user.component.html',
  styleUrls: ['./participants-add-user.component.css']
})
export class ParticipantsAddUserComponent implements OnInit {

  users: User[] = [];
  public User = User;
  search: string = '';
  selectedUsers: number[] = []; // tableau des id des utilisateurs selectionnés
  @Output() close = new EventEmitter<void>();
  @Input() coursId!: number;

  constructor(private usersService: UsersService, private coursService: CoursService ,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe( data => {
      this.users = data;
    });
  }

  get UsersFiltres(): User[] {
    if (!this.search) return this.users;
    const s = this.search.toLowerCase();
    return this.users.filter(u =>
      u.name.toLowerCase().includes(s) ||
      u.mail.toLowerCase().includes(s)
    );
  }

  get selectedUsersName(): string {
    return this.selectedUsers.map(id => User.getNameById(this.users, id)).join(', ');
  }


  selectUser(userId: number): void {
    if (this.selectedUsers.includes(userId)) {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    } else {
      this.selectedUsers = [...this.selectedUsers, userId];
    }
    this.cdr.detectChanges();
  }

  addSelectedUsers(): void {
    this.selectedUsers.forEach(userId => {
      this.coursService.addInscrit(userId, this.coursId).subscribe({
        next: () => {
          console.log(`Utilisateur ${userId} ajouté au cours ${this.coursId}`);
        },
        error: (err) => {
          console.error(`Erreur lors de l'ajout de l'utilisateur ${userId} au cours ${this.coursId}:`, err);
        }
      });
    }
    );
    this.close.emit();
  }



}
