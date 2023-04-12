import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppMode, Notepad } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { AlertService } from '../../utils/alert/alert.service';

@Component({
  templateUrl: 'notepad-detail.component.html'
})
export class NotepadDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  notepad = new Notepad();

  ngOnInit() {
    this.userdata.localSettings.appMode = AppMode.NOTES;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedNotepad = this.userdata.findNotepad(+id);
        if (navigatedNotepad == null) {
          this.router.navigate(['/']);
        } else {
          this.notepad = navigatedNotepad;
          this.userdata.localSettings.currentNotepadId = this.notepad.id;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasNotes() {
    return this.notepad.noteAmount > 0;
  }

  isValidForm() {
    return this.notepad.name.length > 0;
  }

  update(notepad: Notepad) {
    notepad.updated = new Date().getTime();
    if (notepad.id == 0) {
      notepad.created = new Date().getTime();
      this.userdata.saveNotepad(notepad)
        .then(() => this.router.navigate(['/notepad/' + notepad.id]))
        .catch(error => {
          console.error(error.message);
          this.alertService.error('error.save');
        });
    } else {
      this.userdata.updateNotepad(notepad)
        .then(() => this.router.navigate(['/']))
        .catch(error => {
          console.error(error.message);
          this.alertService.error(notepad.isDeleted ? 'error.delete' : 'error.update');
          notepad.isDeleted = false;
        });
    }
  }

  delete(notepad: Notepad) {
    notepad.isDeleted = true;
    notepad.updated = new Date().getTime();
    this.update(notepad);
    this.userdata.localSettings.currentNotepadId = 0;
  }
}
