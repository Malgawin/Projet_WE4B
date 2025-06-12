import { Component, OnInit } from '@angular/core';
import {Cours} from "../../../class/cours";

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements OnInit {

  searchTerm = '';
  selectedUeIds: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ues: Cours[] = [
    new Cours(0, "AAA", "bbb", "oe", "ddd"),
    new Cours(0, "bbb", "fff", "oe", "ddd"),
    new Cours(0, "AbbAA", "bbb", "oe", "ddd"),
    new Cours(0, "aaee", "iii", "oe", "ddd"),
    new Cours(0, "zzz", "opo", "oe", "ddd"),
    new Cours(0, "kkk", "rop", "oe", "ddd"),
    new Cours(0, "jjj", "zze", "oe", "ddd")
  ]

  filteredUes() {
    const term = this.searchTerm.toLowerCase();
    return this.ues.filter(ue =>
      ue.name.toLowerCase().includes(term) ||
      ue.code.toLowerCase().includes(term)
    );
  }

  toggleUeSelection(ueId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedUeIds.push(ueId);
    } else {
      this.selectedUeIds = this.selectedUeIds.filter(id => id !== ueId);
    }
  }

  submitRegistration() {
    console.log('Selected UEs:', this.selectedUeIds);

    // TODO: emit selectedUeIds to the parent modal/component

    this.searchTerm = '';
    this.selectedUeIds = [];
  }
}
