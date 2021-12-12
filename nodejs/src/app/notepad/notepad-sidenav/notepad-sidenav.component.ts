import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note, Notepad } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  selector: 'app-notepad-sidenav',
  templateUrl: 'notepad-sidenav.component.html',
  styleUrls: ['notepad-sidenav.component.css']
})
export class NotepadSidenavComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService) {}

  private subscription: Subscription;
  notepads: Notepad[] = [];
  currentNotepad = new Notepad();
  showNotepads = true;
  showNotes = false;
  sectionNotes: { section: string; notes: Note[] }[] = [];

  ngOnInit(): void {
    this.subscription = this.userdata.subscribeOnDataUpdate(() => {
      this.notepads = this.userdata.notepads().sort((a, b) => (a.name < b.name ? -1 : 1));
      this.update();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateSectionNotes(): void {
    this.sectionNotes = [];
    const pinnedNotes: Note[] = [];
    const sectionNotes = new Map<string, Note[]>();
    const archivedNotes: Note[] = [];
    this.userdata.notes()
      .filter(x => x.notepadId == this.userdata.localSettings.currentNotepadId)
      .forEach(x => {
        if (x.isPinned && !x.isArchived) {
          pinnedNotes.push(x);
        } else if (!x.isPinned && !x.isArchived) {
          sectionNotes.set(x.section, (sectionNotes.get(x.section) || []).concat(x));
        } else {
          archivedNotes.push(x);
        }
      });

    sectionNotes.forEach((notes, section) => {
      if (section.length == 0) {
        notes.sort((a, b) => a.updated > b.updated ? -1 : 1);
      } else {
        notes.sort((a, b) => a.name < b.name ? -1 : 1);
      }
      this.sectionNotes.push({ section: section, notes: notes });
    });
    this.sectionNotes.sort((a, b) => a.section < b.section ? -1 : 1);

    if (this.sectionNotes.length > 0 && this.sectionNotes[0].section.length == 0) {
      this.sectionNotes[0].section = 'notepad_sidenav.notes';
    }
    if (pinnedNotes.length > 0) {
      this.sectionNotes = [
        { section: 'notepad_sidenav.bookmark_notes', notes: pinnedNotes.sort((a, b) => a.name < b.name ? -1 : 1) },
        ...this.sectionNotes
      ];
    }
    if (archivedNotes.length > 0) {
      this.sectionNotes = [
        ...this.sectionNotes,
        { section: 'notepad_sidenav.archived_notes', notes: archivedNotes.sort((a, b) => a.name < b.name ? -1 : 1) }
      ];
    }
  }

  updateCurrentNotepadId(notepad: Notepad): void {
    this.userdata.localSettings.currentNotepadId = notepad.id;
    this.update();
  }

  update(): void {
    this.showNotepads = this.userdata.localSettings.currentNotepadId == 0;
    this.showNotes = !this.showNotepads;
    this.currentNotepad = this.userdata.findNotepad(this.userdata.localSettings.currentNotepadId);
    this.updateSectionNotes();
  }

  clearState(): void {
    this.userdata.localSettings.currentNotepadId = 0;
    this.update();
  }
}
