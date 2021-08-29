import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note, Notepad } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { NotepadStateService } from '../notepad-state.service';

@Component({
  selector: 'app-notepad-sidenav',
  templateUrl: 'notepad-sidenav.component.html'
})
export class NotepadSidenavComponent implements OnInit {
  constructor(private userdata: UserDataService,
              private notepadState: NotepadStateService) {}

  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.userdata.subscribeOnInit(() => null);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.notepadState.clear();
  }

  clearState() {
    this.notepadState.clear();
  }

  updateState(notepad: Notepad) {
    this.notepadState.set(notepad);
  }

  showNotepads(): boolean {
    return this.notepadState.getNotepadId() == 0;
  }

  showNotes(): boolean {
    return !this.showNotepads();
  }

  notepadName(): string {
    return this.userdata.findNotepad(this.notepadState.getNotepadId()).name;
  }

  notepads(): Notepad[] {
    return this.userdata.notepads().sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  notes(): Note[] {
    return this.userdata.notes()
      .filter(x => x.notepadId == this.notepadState.getNotepadId())
      .sort((a, b) => (a.updated > b.updated ? -1 : 1));
  }
}
