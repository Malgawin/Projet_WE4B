import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../class/user";
import {EnrollmentService} from "../../../services/enrollment.service";

@Component({
  selector: 'app-registered-list-element',
  templateUrl: './registered-list-element.component.html',
  styleUrls: ['./registered-list-element.component.css']
})
export class RegisteredListElementComponent implements OnInit {

  @Input() registered!: User;
  @Input() courseId!: number;

  @Output() delete = new EventEmitter<number>();

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
  }

  onDelete() {
    if (confirm("Voulez-vous vraiment désinscire l'utilisateur de ce cours ?")){
      this.enrollmentService.deleteOne(this.registered.id, this.courseId).subscribe({
        error: (err) => console.error("Erreur lors de la désinscription de l'utilisateur " + this.registered.id.toString() + " au cours " + this.courseId.toString(), err)
      })
      this.delete.emit(this.registered.id);
    }
  }
}
