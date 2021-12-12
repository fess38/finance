import { Note } from '../../core/model/model';

export class NoteWrapper {
  note = new Note();
  rows: string[];
  selectionStart = 0;
  selectionEnd = 0;
  cursorRow = 0;
  cursorColumn = 0;
  rowHeight = 0;
  scrollTop = 0;
  bottomPosition = 0;

  private set text(text: string) {
    this.note.text = text;
    this.rows = this.note.text.split('\n');
  }

  prepareForMarkdown(): string {
    return this.expendCollapsable(this.note.text);
  }

  hasName(): boolean {
    return this.note.name.length > 0;
  }

  isEquals(note: Note): boolean {
    return !(this.note.name != note.name
      || this.note.text != note.text
      || (this.note.notepadId != note.notepadId && this.note.text.length > 0)
      || (this.note.isPinned != note.isPinned)
      || (this.note.isArchived != note.isArchived)
      || (this.note.section != note.section)
    );
  }

  update(noteTextElement: HTMLTextAreaElement): void {
    this.text = noteTextElement.value;
    this.selectionStart = noteTextElement.selectionStart;
    this.selectionEnd = noteTextElement.selectionEnd;
    this.rowHeight = noteTextElement.scrollHeight / this.rows.length;
    this.scrollTop = noteTextElement.scrollTop;
    this.bottomPosition = this.scrollTop + noteTextElement.clientHeight;
    this.updateCursorPosition();
  }

  enter(): void {
    // insert new line
    this.text = this.note.text.slice(0, this.selectionStart)
      .concat('\n')
      .concat(this.note.text.slice(this.selectionStart));
    ++this.selectionStart;
    this.updateCursorPosition();

    const previousRow = this.rows[this.cursorRow - 1];
    const currentRow = this.rows[this.cursorRow];
    let insertedText = '';
    let deletePreviousRow = false;

    const ulMatch = RegExp(/^( *[-*] )(.*)/).exec(previousRow);
    if (ulMatch) {
      if (ulMatch[2].length > 0 || currentRow.length > 0) {
        insertedText = ulMatch[1];
      } else {
        deletePreviousRow = true;
      }
    }

    const olMatch = RegExp(/^( *)([0-9]+)(\. )(.*)/).exec(previousRow);
    if (olMatch) {
      if (olMatch[4].length > 0 || currentRow.length > 0) {
        insertedText = olMatch[1] + String(+olMatch[2] + 1) + olMatch[3];
      } else {
        deletePreviousRow = true;
      }
    }

    if (insertedText) {
      this.text = this.rows.slice(0, this.cursorRow)
        .concat([insertedText + currentRow])
        .concat(this.rows.slice(this.cursorRow + 1))
        .join('\n');
      this.selectionStart += insertedText.length;
    } else if (deletePreviousRow) {
      this.text = this.rows.slice(0, this.cursorRow - 1)
        .concat([insertedText])
        .concat(this.rows.slice(this.cursorRow + 1))
        .join('\n');
      this.selectionStart -= previousRow.length + 1;
    }
    this.selectionEnd = this.selectionStart;
    this.scrollDown();
  }

  moveRowUp(): void {
    const previousRows = this.rows.slice(0, Math.max(0, this.cursorRow - 1));
    const previousRow = this.rows[this.cursorRow - 1];
    const currentRow = this.rows[this.cursorRow];
    const nextRows = this.rows.slice(this.cursorRow + 1);

    if (previousRow == null) {
      return;
    }

    this.text = previousRows
      .concat([currentRow, previousRow])
      .concat(nextRows)
      .join('\n');
    this.selectionStart -= (previousRow || '').length + 1;
    this.selectionEnd = this.selectionStart;
    this.scrollUp();
  }

  moveRowDown(): void {
    const previousRows = this.rows.slice(0, Math.max(0, this.cursorRow));
    const currentRow = this.rows[this.cursorRow];
    const nextRow = this.rows[this.cursorRow + 1];
    const nextRows = this.rows.slice(this.cursorRow + 2);

    if (nextRow == null) {
      return;
    }

    this.text = previousRows
      .concat([nextRow, currentRow])
      .concat(nextRows)
      .join('\n');
    this.selectionStart += (nextRow || '').length + 1;
    this.selectionEnd = this.selectionStart;
    this.scrollDown();
  }

  cut(): string {
    const previousRows = this.rows.slice(0, Math.max(0, this.cursorRow));
    const currentRow = this.rows[this.cursorRow];
    const nextRows = this.rows.slice(this.cursorRow + 1);
    this.text = previousRows
      .concat([''])
      .concat(nextRows)
      .join('\n');
    this.selectionStart -= this.cursorColumn;
    this.selectionEnd = this.selectionStart;
    return currentRow;
  }

  bold(): void {
    this.wrapSelection('**', '**');
  }

  collasableSection(): void {
    this.wrapSelection('<{', '}>');
  }

  expendCollapsable(noteText: string): string {
    let text = noteText;
    let i = 0;
    let j = 0;

    let condition = true;
    while (condition) {
      i = text.indexOf('<{');
      j = text.indexOf('}>');
      if (i == -1 || j == -1 || j < i) {
        condition = false;
        continue;
      }
      text = [
        text.slice(0, i),
        '\n<details><summary>',
        text.slice(i + 2, text.indexOf('\n', i)),
        '</summary>',
        text.slice(text.indexOf('\n', i), j),
        '\n</details>\n',
        text.slice(j + 2)
      ].join('');
    }

    return text;
  }

  imageUrl(imageUrl: string): void {
    this.insertText(`<img src="${imageUrl}" alt="image" width="100%"/>`)
  }

  fileUrl(fileUrl: string): void {
    this.insertText(`[](${fileUrl})`);
  }

  private updateCursorPosition(): void {
    this.cursorRow = 0;
    this.cursorColumn = 0;
    for (let i = 0; i < this.selectionStart; ++i) {
      const isNewLine = this.note.text[i] == '\n';
      if (isNewLine) {
        ++this.cursorRow;
        this.cursorColumn = 0;
      } else {
        ++this.cursorColumn;
      }
    }
  }

  private scrollUp(): void {
    if ((this.cursorRow - 1) * this.rowHeight < this.scrollTop) {
      this.scrollTop -= this.rowHeight;
    }
  }

  private scrollDown(): void {
    this.updateCursorPosition();
    if ((this.cursorRow + 1) * this.rowHeight > this.bottomPosition) {
      this.scrollTop += this.rowHeight;
    }
  }

  private wrapSelection(before: string, after: string): void {
    let selection = this.note.text.slice(this.selectionStart, this.selectionEnd);
    const i = selection.indexOf(before);
    const j = selection.indexOf(after, i + before.length);
    const isWrapped = i != -1 && j != -1;
    if (isWrapped) {
      selection = selection.slice(i + before.length, j);
    } else {
      selection = before + selection + after;
    }

    this.text = [
      this.note.text.slice(0, this.selectionStart),
      selection,
      this.note.text.slice(this.selectionEnd)
    ].join('');

    if (selection == (before + after)) {
      this.selectionStart += before.length;
      this.selectionEnd = this.selectionStart;
    } else if (isWrapped) {
      this.selectionEnd -= (before.length + after.length);
    } else {
      this.selectionEnd += (before.length + after.length);
    }
  }

  private insertText(insertedText: string): void {
    this.text = [
      this.note.text.slice(0, this.selectionStart),
      insertedText,
      this.note.text.slice(this.selectionStart)
    ].join('');
    this.selectionStart += insertedText.length;
    this.selectionEnd = this.selectionStart;
  }
}
