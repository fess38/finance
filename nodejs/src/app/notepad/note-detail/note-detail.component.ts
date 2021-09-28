import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
              private clipboard: Clipboard) {}

  private subscription: Subscription;
  private autosaveSubscription: Subscription;
  private noteWrapper = new NoteWrapper();
  private sourceNote = new Note();
  @ViewChild('noteTextElement')
  private noteTextElement: ElementRef;
  viewMode = true;

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

  onViewModeChange(): void {
    this.viewMode = !this.viewMode;
    if (!this.viewMode) {
      (this.noteTextElement.nativeElement as HTMLTextAreaElement).value = this.note.text;
    }
  }

  notepads(): Notepad[] {
    return this.userdata.notepads().sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  textForMarkdown(): string {
    return this.noteWrapper.prepareForMarkdown();
  }

  onClick(event: MouseEvent): void {
    this.updateCursorPosition(event);
  }

  onKeyDown(event: KeyboardEvent): void {
    this.updateCursorPosition(event);
    let isUpdated = true;
    if (event.ctrlKey || event.metaKey) {
      if (event.code == 'ArrowUp') {
        this.noteWrapper.moveRowUp();
      } else if (event.code == 'ArrowDown') {
        this.noteWrapper.moveRowDown();
      } else if (event.key == 'b' || event.key == 'и') {
        this.noteWrapper.bold();
      } else if (event.key == 'x' || event.key == 'ч') {
        this.clipboard.copy(this.noteWrapper.cut());
      } else {
        isUpdated = false;
      }
    } else {
      isUpdated = false;
    }

    if (isUpdated) {
      this.afterChange(event.target as HTMLTextAreaElement);
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    this.updateCursorPosition(event);
    if (event.code == 'Enter') {
      this.noteWrapper.onEnter();
      this.afterChange(event.target as HTMLTextAreaElement);
    }
  }

  private updateCursorPosition(event: KeyboardEvent | MouseEvent): void {
    const noteTextElement = event.target as HTMLTextAreaElement;
    this.noteWrapper.note.text = noteTextElement.value;
    if (noteTextElement.selectionStart || noteTextElement.selectionStart == 0) {
      this.noteWrapper.updateCursorPosition(
        noteTextElement.selectionStart,
        noteTextElement.selectionEnd,
        noteTextElement.scrollHeight,
        noteTextElement.scrollTop,
        noteTextElement.scrollTop + noteTextElement.clientHeight
      );
    }
  }

  private afterChange(noteTextElement: HTMLTextAreaElement): void {
    setTimeout(() => {
      noteTextElement.value = this.note.text;
      noteTextElement.setSelectionRange(
        this.noteWrapper.getSelectionStartIndex(),
        this.noteWrapper.getSelectionEndIndex()
      );
    });
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

  private updateSourceNote(note: Note) {
    this.sourceNote.notepadId = note.notepadId;
    this.sourceNote.name = note.name;
    this.sourceNote.text = note.text;
  }

  delete(note: Note) {
    note.isDeleted = true;
    note.updated = new Date().getTime();
    this.update(note);
  }
}
