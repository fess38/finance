import { Note } from '../../core/model/model';

export class NoteWrapper {
  note = new Note();
  private selectionStartIndex = 0;
  private selectionEndIndex = 0;
  private heightPerRow = 0;
  private clientTopPosition = 0;
  private clientBottomPosition = 0;
  private cursorRowIndex = 0;
  private cursorColumnIndex = 0;
  private rows: string[];

  prepareForMarkdown(): string {
    return this.note.text;
  }

  hasName(): boolean {
    return this.note.name.length > 0;
  }

  isEquals(note: Note): boolean {
    return !(this.note.name != note.name
      || this.note.text != note.text
      || (this.note.notepadId != note.notepadId && this.note.text.length > 0));
  }

  updateCursorPosition(startIndex: number,
                      endIndex: number,
                      height: number,
                      clientTopPosition: number,
                      clientBottomPosition: number) {
    this.selectionStartIndex = startIndex;
    this.selectionEndIndex = endIndex;
    this.clientTopPosition = clientTopPosition;
    this.clientBottomPosition = clientBottomPosition;

    this.cursorRowIndex = 0;
    this.cursorColumnIndex = 0;
    for (let i = 0; i < this.note.text.length; ++i) {
      const isNewLine = this.note.text[i] == '\n';
      if (i < this.selectionStartIndex) {
        if (isNewLine) {
          ++this.cursorRowIndex;
          this.cursorColumnIndex = 0;
        } else {
          ++this.cursorColumnIndex;
        }
      }
    }
    this.rows = this.note.text.split('\n');
    this.heightPerRow = this.rows.length > 0 ? height / this.rows.length : height
  }

  getSelectionStartIndex(): number {
    return this.selectionStartIndex;
  }

  getSelectionEndIndex(): number {
    return this.selectionEndIndex;
  }

  onEnter(): void {
    const previousRow = this.rows[this.cursorRowIndex - 1];
    let insertedText = '';
    let deletePreviousRow = false;

    const ulMatch = previousRow.match(/^( *[-*] )(.*)/);
    if (ulMatch) {
      if (ulMatch[2].length > 0) {
        insertedText = ulMatch[1];
      } else {
        deletePreviousRow = true;
      }
    }

    const olMatch = previousRow.match(/^( *)([0-9]+)(\. )(.*)/);
    if (olMatch) {
      if (olMatch[4].length > 0) {
        insertedText = olMatch[1] + String(+olMatch[2] + 1) + olMatch[3];
      } else {
        deletePreviousRow = true;
      }
    }

    if (insertedText) {
      this.note.text = this.rows.slice(0, this.cursorRowIndex)
        .concat([insertedText])
        .concat(this.rows.slice(this.cursorRowIndex + 1))
        .join('\n');
      this.selectionStartIndex += insertedText.length;
    } else if (deletePreviousRow) {
      this.note.text = this.rows.slice(0, this.cursorRowIndex - 1)
        .concat([insertedText])
        .concat(this.rows.slice(this.cursorRowIndex + 1))
        .join('\n');
      this.selectionStartIndex -= previousRow.length + 1;
    }
    this.selectionEndIndex = this.selectionStartIndex;
  }

  moveRowUp(): void {
    const previousRows = this.rows.slice(0, Math.max(0, this.cursorRowIndex - 1));
    const previousRow = this.rows[this.cursorRowIndex - 1];
    const currentRow = this.rows[this.cursorRowIndex];
    const nextRows = this.rows.slice(this.cursorRowIndex + 1);

    if (previousRow == null) {
      return;
    }

    this.note.text = previousRows
      .concat([currentRow, previousRow])
      .concat(nextRows)
      .join('\n');
    this.selectionStartIndex -= (previousRow || '').length + 1;
    this.selectionEndIndex = this.selectionStartIndex;
  }

  moveRowDown(): void {
    const previousRows = this.rows.slice(0, Math.max(0, this.cursorRowIndex));
    const currentRow = this.rows[this.cursorRowIndex];
    const nextRow = this.rows[this.cursorRowIndex + 1];
    const nextRows = this.rows.slice(this.cursorRowIndex + 2);

    if (nextRow == null) {
      return;
    }

    this.note.text = previousRows
      .concat([nextRow, currentRow])
      .concat(nextRows)
      .join('\n');
    this.selectionStartIndex += (nextRow || '').length + 1;
    this.selectionEndIndex = this.selectionStartIndex;
  }

  cut(): string {
    const previousRows = this.rows.slice(0, Math.max(0, this.cursorRowIndex));
    const currentRow = this.rows[this.cursorRowIndex];
    const nextRows = this.rows.slice(this.cursorRowIndex + 1);
    this.note.text = previousRows
      .concat([''])
      .concat(nextRows)
      .join('\n');
    this.selectionStartIndex -= this.cursorColumnIndex;
    this.selectionEndIndex = this.selectionStartIndex;
    return currentRow;
  }

  bold(): void {
    let selection = this.note.text.slice(this.selectionStartIndex, this.selectionEndIndex);
    const boldMatch = selection.match(/^\*\*(.*)\*\*$/);
    selection = boldMatch ? boldMatch[1] : '**' + selection + '**';

    this.note.text = [
      this.note.text.slice(0, this.selectionStartIndex),
      selection,
      this.note.text.slice(this.selectionEndIndex)
    ].join('');

    if (selection == '****') {
      this.selectionStartIndex += 2;
      this.selectionEndIndex = this.selectionStartIndex;
    } else if (boldMatch) {
      this.selectionEndIndex -= 4;
    } else {
      this.selectionEndIndex += 4;
    }
  }
}
