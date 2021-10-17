import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownService } from 'ngx-markdown';
import { interval, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppMode, Note, Notepad } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { AlertService } from '../../utils/alert/alert.service';
import { NoteWrapper } from './note-wrapper';

@Component({
  templateUrl: 'note-detail.component.html',
  styleUrls: ['note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private markdownService: MarkdownService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private clipboard: Clipboard) {}

  private subscription: Subscription;
  private autosaveSubscription: Subscription;
  private noteWrapper = new NoteWrapper();
  private sourceNote = new Note();
  @ViewChild('noteTextElementRef')
  private noteTextElementRef: ElementRef;
  viewMode = true;
  editMetaMode = false;

  set note(note: Note) {
    this.noteWrapper.note = note;
  }

  get note(): Note {
    return this.noteWrapper.note;
  }

  private noteTextElement(): HTMLTextAreaElement {
    return this.noteTextElementRef.nativeElement as HTMLTextAreaElement;
  }

  ngOnInit() {
    this.userdata.localSettings.appMode = AppMode.NOTES;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
      (this.noteTextElement()).value = this.note.text;
    }
  }

  onEditMetaModeChange(): void {
    this.editMetaMode = !this.editMetaMode;
  }

  isEmptyNote(): boolean {
    return this.note.text.length == 0;
  }

  isViewMode(): boolean {
    return this.viewMode;
  }

  isEditMetaMode(): boolean {
    return this.editMetaMode || this.isEmptyNote();
  }

  notepads(): Notepad[] {
    return this.userdata.notepads().sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  textForMarkdown(): string {
    return this.markdownService.compile(this.noteWrapper.note.text);
  }

  onClick(): void {
    this.noteWrapper.update(this.noteTextElement());
  }

  onKeyDown(event: KeyboardEvent): void {
    this.noteWrapper.update(this.noteTextElement());
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
    } else if (event.code == 'Enter') {
      this.noteWrapper.enter();
    } else {
      isUpdated = false;
    }

    if (isUpdated) {
      this.afterChange();
    }
  }

  onKeyUp(): void {
    this.noteWrapper.update(this.noteTextElement());
  }

  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; ++i) {
      if (!items[i].type.startsWith('image')) {
        continue;
      }

      event.preventDefault();
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.userdata.saveImage(event.target.result)
          .then(imageUrl => {
            this.noteWrapper.update(this.noteTextElement());
            this.noteWrapper.addImageUrl(imageUrl);
            this.afterChange();
          })
          .catch(error => {
            this.alertService.error('error.save_image');
            console.error(error.message);
          });
      };
      reader.readAsDataURL(items[i].getAsFile());
      break;
    }
  }

  private afterChange(): void {
    setTimeout(() => {
      this.noteTextElement().value = this.note.text;
      this.noteTextElement().setSelectionRange(
        this.noteWrapper.selectionStart,
        this.noteWrapper.selectionEnd
      );
      this.noteTextElement().scrollTop = this.noteWrapper.scrollTop;
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
          this.alertService.error('error.save');
          console.error(error.message);
        });
    } else {
      this.userdata.updateNote(note)
        .then(() => {
          this.updateSourceNote(note);
          if (note.isDeleted) {
            this.router.navigate(['/']);
          }
        })
        .catch(error => {
          this.alertService.error(note.isDeleted ? 'error.delete' : 'error.update');
          note.isDeleted = false;
          console.error(error.message);
        });
    }
  }

  private updateSourceNote(note: Note) {
    this.sourceNote.notepadId = note.notepadId;
    this.sourceNote.name = note.name;
    this.sourceNote.text = note.text;
    this.sourceNote.isPinned = note.isPinned;
  }

  delete(note: Note) {
    note.isDeleted = true;
    note.updated = new Date().getTime();
    this.update(note);
  }
}
