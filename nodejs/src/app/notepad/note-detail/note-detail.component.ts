import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Note, Notepad } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'note-detail.component.html',
  styleUrls: ['note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  private sourceNote = new Note();
  viewMode = true;
  note = new Note();

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedNote = this.userdata.findNote(+id);
        if (navigatedNote == null) {
          this.router.navigate(['/']);
        } else {
          this.note = navigatedNote;
          this.userdata.currentNotepadId = this.note.notepadId;
          this.updateSourceNote(this.note);
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    } else {
      if (!this.userdata.currentNotepadId) {
        this.router.navigate(['/']);
      }
      this.viewMode = false;
      this.note.notepadId = this.userdata.currentNotepadId;
      this.translate.get('note.new').subscribe(defaultName => {
        this.note.name = defaultName;
        this.updateSourceNote(this.note);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.isValidForm()) {
      this.update(this.note);
    }
  }

  updateSourceNote(note: Note) {
    this.sourceNote.notepadId = note.notepadId;
    this.sourceNote.name = note.name;
    this.sourceNote.text = note.text;
  }

  nameForView(): string {
    return '# ' + this.note.name + '\n---';
  }

  notepads(): Notepad[] {
    return this.userdata.notepads().sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  rows(): number {
    return this.note.text.split('\n').length + 2;
  }

  isValidForm() {
    return this.note.name.length > 0
      && this.userdata.findNotepad(this.note.notepadId)
      && (
        this.note.name != this.sourceNote.name
        || this.note.text != this.sourceNote.text
        || (this.note.notepadId != this.sourceNote.notepadId && this.note.text.length > 0)
      );
  }

  update(note: Note) {
    note.updated = new Date().getTime();
    if (note.id == 0) {
      note.created = new Date().getTime();
      this.userdata.saveNote(note)
        .then(() => {
          this.updateSourceNote(note);
          this.router.navigate(['/note/' + note.id]);
        })
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateNote(note)
        .then(() => this.updateSourceNote(note))
        .catch(error => {
          note.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  delete(note: Note) {
    note.isDeleted = true;
    note.updated = new Date().getTime();
    this.update(note);
  }
}
