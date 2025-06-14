import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {Cours} from "../../../class/cours";

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css']
})
export class ModalRegisterComponent implements AfterViewInit {

  @ViewChild('registerModal') registerModal!: ElementRef;

  @Input() alreadySelected: Cours[] = [];
  @Output() emitSelection = new EventEmitter<Cours[]>();

  searchTerm = '';
  ues: Cours[] = [
    new Cours(0, "AAA", "bbb", "oe", "ddd"),
    new Cours(1, "bbb", "fff", "oe", "ddd"),
    new Cours(2, "AbbAA", "bbb", "oe", "ddd"),
    new Cours(3, "aaee", "iii", "oe", "ddd"),
    new Cours(4, "zzz", "opo", "oe", "ddd"),
    new Cours(5, "kkk", "rop", "oe", "ddd"),
    new Cours(6, "jjj", "zze", "oe", "ddd")
  ];
  selectedUe: Cours[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    const modalEl = this.registerModal.nativeElement;

    modalEl.addEventListener('shown.bs.modal', () => {
      this.resetSelection();
    });
  }

  resetSelection(): void {
    // Create a fresh copy
    this.selectedUe = [...this.alreadySelected];
    this.searchTerm = '';
  }

  filteredUes(): Cours[] {
    const term = this.searchTerm.toLowerCase();
    return this.ues.filter(ue =>
      ue.name.toLowerCase().includes(term) ||
      ue.code.toLowerCase().includes(term)
    );
  }

  toggleUeSelection(ueId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const selected = this.ues.find(ue => ue.id === ueId);
    if (!selected) return;

    if (checkbox.checked) {
      if (!this.selectedUe.some(ue => ue.id === ueId)) {
        this.selectedUe.push(selected);
      }
    } else {
      this.selectedUe = this.selectedUe.filter(ue => ue.id !== ueId);
    }
  }

  isChecked(ueId: number): boolean {
    return this.selectedUe.some(selected => selected.id === ueId);
  }

  submitRegistration(): void {
    this.emitSelection.emit([...this.selectedUe]); // send copy
    this.selectedUe = [];
    this.searchTerm = '';
  }
}
