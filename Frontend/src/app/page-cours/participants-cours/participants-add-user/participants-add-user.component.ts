import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService, User } from '../../../services/users.service';


@Component({
  selector: 'app-participants-add-user',
  templateUrl: './participants-add-user.component.html',
  styleUrls: ['./participants-add-user.component.css']
})
export class ParticipantsAddUserComponent implements OnInit {

  users: User[] = [];
  search: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(private usersService: UsersService) { }

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


}
