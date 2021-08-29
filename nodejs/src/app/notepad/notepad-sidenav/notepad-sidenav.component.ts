import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note, Notepad } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  selector: 'app-notepad-sidenav',
  templateUrl: 'notepad-sidenav.component.html'
})
export class NotepadSidenavComponent implements OnInit {
  constructor(private userdata: UserDataService) {}

  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.userdata.subscribeOnInit(() => null);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateCurrentNotepadId(notepad: Notepad) {
    this.userdata.currentNotepadId = notepad.id;
  }

  clearState() {
    this.userdata.currentNotepadId = 0;
  }

  showNotepads(): boolean {
    return this.userdata.currentNotepadId == 0;
  }

  showNotes(): boolean {
    return !this.showNotepads();
  }

  notepadName(): string {
    return this.userdata.findNotepad(this.userdata.currentNotepadId).name;
  }

  notepads(): Notepad[] {
    return this.userdata.notepads().sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  notes(): Note[] {
    return this.userdata.notes()
      .filter(x => x.notepadId == this.userdata.currentNotepadId)
      .sort((a, b) => (a.updated > b.updated ? -1 : 1));
  }
}
