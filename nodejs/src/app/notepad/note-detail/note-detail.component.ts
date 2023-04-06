import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownService } from 'ngx-markdown';
import { interval, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppMode, File, Note, Notepad } from '../../core/model/model';
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

  readonly allowedMimeTypes = new Map<string, string>([
    ['image/jpeg', 'jpg'],
    ['image/png', 'png'],
    ['application/pdf', 'pdf'],
    ['application/zip', 'zip'],
    ['application/gzip', 'gz'],
    ['application/msword', 'doc'],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
    ['application/vnd.ms-excel', 'xls'],
    ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
  ]);
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

  ngOnInit(): void {
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
      this.translate.get('note.new').subscribe((defaultName: string) => {
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
    return this.markdownService.compile(this.noteWrapper.prepareForMarkdown(this.markdownService));
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
      } else if (event.shiftKey && (event.key == 'x' || event.key == 'ч')) {
        this.clipboard.copy(this.noteWrapper.cut());
      } else if (event.key == 'k' || event.key == 'л') {
        this.noteWrapper.collasableSection();
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

  onPaste(event: ClipboardEvent): void {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; ++i) {
      const file = new File();
      file.contentType = items[i].type;
      file.extension = this.allowedMimeTypes.get(file.contentType) || '';
      if (file.extension.length == 0 || event.clipboardData.getData('text').length > 0) {
        continue;
      }

      event.preventDefault();
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        file.data = event.target.result.toString();
        this.userdata.saveFile(file)
          .then(fileUrl => {
            this.noteWrapper.update(this.noteTextElement());
            if (file.contentType.startsWith('image/')) {
              this.noteWrapper.imageUrl(fileUrl);
            } else {
              this.noteWrapper.fileUrl(fileUrl);
            }
            this.afterChange();
          })
          .catch((error: Error) => {
            console.error(error.message);
            console.error(`content type: ${file.contentType}`);
            this.alertService.error('error.save_file');
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

  isValidForm(): boolean {
    return this.noteWrapper.hasName()
      && this.userdata.findNotepad(this.note.notepadId)
      && !this.noteWrapper.isEquals(this.sourceNote)
      && !(this.note.isPinned && this.note.isArchived);
  }

  update(note: Note): void {
    note.updated = new Date().getTime();
    if (note.id == 0) {
      note.created = new Date().getTime();
      this.userdata.saveNote(note)
        .then(() => {
          this.updateSourceNote(note);
          this.router.navigate([`/note/${note.id}`]);
        })
        .catch((error: Error) => {
          console.error(error.message);
          this.alertService.error('error.save');
        });
    } else {
      this.userdata.updateNote(note)
        .then(() => {
          this.updateSourceNote(note);
          if (note.isDeleted) {
            this.router.navigate(['/']);
          }
        })
        .catch((error: Error) => {
          console.error(error.message);
          this.alertService.error(note.isDeleted ? 'error.delete' : 'error.update');
          note.isDeleted = false;
        });
    }
  }

  private updateSourceNote(note: Note): void {
    this.sourceNote.notepadId = note.notepadId;
    this.sourceNote.name = note.name;
    this.sourceNote.text = note.text;
    this.sourceNote.isPinned = note.isPinned;
    this.sourceNote.isArchived = note.isArchived;
    this.sourceNote.section = note.section;
  }

  delete(note: Note): void {
    note.isDeleted = true;
    note.updated = new Date().getTime();
    this.update(note);
  }
}
