import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppMode, Note, Notepad } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { NoteWrapper } from './note-wrapper';

@Component({
  templateUrl: 'note-detail.component.html',
  styleUrls: ['note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private changeDetector: ChangeDetectorRef) {}

  private subscription: Subscription;
  private autosaveSubscription: Subscription;
  private noteWrapper = new NoteWrapper();
  private sourceNote = new Note();
  viewMode = true;
  isFocused = false;

  set note(note: Note) {
    this.noteWrapper.note = note;
  }

  get note(): Note {
    return this.noteWrapper.note;
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.userdata.appMode = AppMode.NOTES;
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedNote = this.userdata.findNote(+id);
        if (navigatedNote == null) {
          this.router.navigate(['/']);
        } else {
          this.note = navigatedNote;
          this.userdata.localSettings.currentNotepadId = this.note.notepadId;
          this.updateSourceNote(this.note);
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    } else {
      if (!this.userdata.localSettings.currentNotepadId) {
        this.router.navigate(['/']);
      }
      this.viewMode = false;
      this.note.notepadId = this.userdata.localSettings.currentNotepadId;
      this.translate.get('note.new').subscribe(defaultName => {
        this.note.name = defaultName;
        this.updateSourceNote(this.note);
      });
    }

    this.autosaveSubscription = interval(30000)
      .pipe(filter(() => this.isValidForm() && this.note.id != 0))
      .subscribe(() => this.update(this.note));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.autosaveSubscription) {
      this.autosaveSubscription.unsubscribe();
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

  textForMarkdown(): string {
    return this.noteWrapper.prepareForMarkdown();
  }

  notepads(): Notepad[] {
    return this.userdata.notepads().sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  updateCursorPosition(event: KeyboardEvent): void {
    const noteTextElement = event.target as HTMLTextAreaElement;
    if (noteTextElement.selectionStart || noteTextElement.selectionStart == 0) {
      this.noteWrapper.setSelectionIndexes(noteTextElement.selectionStart, noteTextElement.selectionEnd);
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    this.updateCursorPosition(event);
    if (event.code == 'Enter') {
      this.noteWrapper.onEnter();
      this.afterChange(event.target as HTMLTextAreaElement);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    this.updateCursorPosition(event);
    if (event.ctrlKey) {
      if (event.code == 'ArrowUp') {
        this.noteWrapper.moveRowUp();
        this.afterChange(event.target as HTMLTextAreaElement);
      } else if (event.code == 'ArrowDown') {
        this.noteWrapper.moveRowDown();
        this.afterChange(event.target as HTMLTextAreaElement);
      } else if (event.key == 'b') {
        this.noteWrapper.bold();
        this.afterChange(event.target as HTMLTextAreaElement);
      }
    }
  }

  private afterChange(noteTextElement: HTMLTextAreaElement): void {
    this.changeDetector.detectChanges();
    setTimeout(() => {
      noteTextElement.selectionStart = this.noteWrapper.getSelectionStartIndex();
      noteTextElement.selectionEnd = this.noteWrapper.getSelectionEndIndex();
    }, 10);
  }

  isValidForm() {
    return this.noteWrapper.hasName()
      && this.userdata.findNotepad(this.note.notepadId)
      && !this.noteWrapper.isEquals(this.sourceNote);
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
