import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  _id!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this._id = this.route.parent?.snapshot.paramMap.get('id')!;
  }

  addPost() {
    this.router.navigate(['creation-cours/', this._id])
  }

}
