import { Notepad } from '../core/model/model';

export class NotepadStateService {
  private notepadId = 0;
  private noteId = 0;

  clear() {
    this.notepadId = 0;
    this.noteId = 0;
  }

  set(notepad: Notepad) {
    this.notepadId = notepad.id;
    this.noteId = 0;
  }

  getNotepadId(): number {
    return this.notepadId;
  }

  setNoteId(noteId: number) {
    this.noteId = noteId;
    this.notepadId = 0;
  }

  getNoteId(): number {
    return this.noteId;
  }
}
