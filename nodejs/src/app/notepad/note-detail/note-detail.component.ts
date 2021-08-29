import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { NotepadStateService } from '../notepad-state.service';

@Component({
  templateUrl: './note-detail.component.html'
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private notepadState: NotepadStateService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  note = new Note();

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedNote = this.userdata.notes().filter(x => x.id == +id)[0];
        if (navigatedNote == null) {
          this.router.navigate(['/']);
        } else {
          this.note = navigatedNote;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    } else {
      if (this.notepadState.getNotepadId() == 0) {
        this.router.navigate(['/']);
      }
      this.note.notepadId = this.notepadState.getNotepadId();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  update(note: Note) {
    note.updated = new Date().getTime();
    if (note.id == 0) {
      note.created = new Date().getTime();
      this.userdata.saveNote(note)
        .then(() => this.router.navigate(['/note/' + note.id]))
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateNote(note)
        .then(() => this.router.navigate(['/']))
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

  isValidForm() {
    return this.note.name.length > 0;
  }
}
