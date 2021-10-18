import { NoteWrapper } from './note-wrapper';

describe('NoteWrapper', () => {
  let noteWrapper: NoteWrapper;
  let noteTextElement: HTMLTextAreaElement;

  beforeEach(() => {
    noteWrapper = new NoteWrapper();
    noteTextElement = document.createElement('textarea') as HTMLTextAreaElement;
  });

  it('updateCursorPosition1', () => {
    noteWrapper.update(noteTextElement);
    expect(noteWrapper.cursorRow).toBe(0);
    expect(noteWrapper.cursorColumn).toBe(0);
  });

  it('UudateCursorPosition2', () => {
    noteTextElement.value = 'asdf';
    noteTextElement.selectionStart = 3;
    noteWrapper.update(noteTextElement);
    expect(noteWrapper.cursorColumn).toBe(3);
    expect(noteWrapper.cursorRow).toBe(0);
  });

  it('updateCursorPosition3', () => {
    noteTextElement.value = 'asd\na';
    noteTextElement.selectionStart = 5;
    noteWrapper.update(noteTextElement);
    expect(noteWrapper.cursorColumn).toBe(1);
    expect(noteWrapper.cursorRow).toBe(1);
  });

  it('updateCursorPosition4', () => {
    noteTextElement.value = 'asd\n\n';
    noteTextElement.selectionStart = 5;
    noteWrapper.update(noteTextElement);
    expect(noteWrapper.cursorColumn).toBe(0);
    expect(noteWrapper.cursorRow).toBe(2);
  });

  it('moveRowUp1', () => {
    noteTextElement.value = '';
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowUp();
    expect(noteWrapper.cursorColumn).toBe(0);
    expect(noteWrapper.cursorRow).toBe(0);
    expect(noteWrapper.note.text).toBe('');
  });

  it('moveRowUp2', () => {
    noteTextElement.value = 'asdf';
    noteTextElement.selectionStart = 3;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowUp();
    expect(noteWrapper.cursorColumn).toBe(3);
    expect(noteWrapper.cursorRow).toBe(0);
    expect(noteWrapper.note.text).toBe('asdf');
  });

  it('moveRowUp3', () => {
    noteTextElement.value = 'asdf\nghjk';
    noteTextElement.selectionStart = 5;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowUp();
    expect(noteWrapper.note.text).toBe('ghjk\nasdf');
    expect(noteWrapper.selectionStart).toBe(0);
    expect(noteWrapper.selectionEnd).toBe(0);
  });

  it('moveRowUp4', () => {
    noteTextElement.value = 'a\nghjk';
    noteTextElement.selectionStart = 4;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowUp();
    expect(noteWrapper.note.text).toBe('ghjk\na');
    expect(noteWrapper.selectionStart).toBe(2);
    expect(noteWrapper.selectionEnd).toBe(2);
  });

  it('moveRowUp5', () => {
    noteTextElement.value = 'a\nghjk';
    noteTextElement.selectionStart = 6;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowUp();
    expect(noteWrapper.note.text).toBe('ghjk\na');
    expect(noteWrapper.selectionStart).toBe(4);
    expect(noteWrapper.selectionEnd).toBe(4);
  });

  it('moveRowDown1', () => {
    noteTextElement.value = '';
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowDown();
    expect(noteWrapper.cursorColumn).toBe(0);
    expect(noteWrapper.cursorRow).toBe(0);
    expect(noteWrapper.note.text).toBe('');
  });

  it('moveRowDown2', () => {
    noteTextElement.value = 'asdf';
    noteTextElement.selectionStart = 3;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowDown();
    expect(noteWrapper.cursorColumn).toBe(3);
    expect(noteWrapper.cursorRow).toBe(0);
    expect(noteWrapper.note.text).toBe('asdf');
  });

  it('moveRowDown3', () => {
    noteTextElement.value = 'asdf\nghjk';
    noteTextElement.selectionStart = 0;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowDown();
    expect(noteWrapper.note.text).toBe('ghjk\nasdf');
    expect(noteWrapper.selectionStart).toBe(5);
  });

  it('moveRowDown4', () => {
    noteTextElement.value = 'ghjk\na';
    noteTextElement.selectionStart = 2;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowDown();
    expect(noteWrapper.note.text).toBe('a\nghjk');
    expect(noteWrapper.selectionStart).toBe(4);
  });

  it('moveRowDown5', () => {
    noteTextElement.value = 'ghjk\na';
    noteTextElement.selectionStart = 4;
    noteWrapper.update(noteTextElement);
    noteWrapper.moveRowDown();
    expect(noteWrapper.note.text).toBe('a\nghjk');
    expect(noteWrapper.selectionStart).toBe(6);
  });

  it('cut1', () => {
    noteTextElement.value = '';
    noteWrapper.update(noteTextElement);
    noteWrapper.cut();
    expect(noteWrapper.note.text).toBe('');
    expect(noteWrapper.selectionStart).toBe(0);
  });

  it('cut2', () => {
    noteTextElement.value = 'asdf';
    noteTextElement.selectionStart = 2;
    noteWrapper.update(noteTextElement);
    noteWrapper.cut();
    expect(noteWrapper.note.text).toBe('');
    expect(noteWrapper.selectionStart).toBe(0);
  });

  it('cut3', () => {
    noteTextElement.value = 'asdf\nghjk';
    noteTextElement.selectionStart = 3;
    noteWrapper.update(noteTextElement);
    noteWrapper.cut();
    expect(noteWrapper.note.text).toBe('\nghjk');
    expect(noteWrapper.selectionStart).toBe(0);
  });

  it('cut4', () => {
    noteTextElement.value = 'asdf\nghjk\nlll';
    noteTextElement.selectionStart = 7;
    noteWrapper.update(noteTextElement);
    noteWrapper.cut();
    expect(noteWrapper.note.text).toBe('asdf\n\nlll');
    expect(noteWrapper.selectionStart).toBe(5);
  });

  it('cut5', () => {
    noteTextElement.value = 'asdf\nghjk';
    noteTextElement.selectionStart = 7;
    noteWrapper.update(noteTextElement);
    noteWrapper.cut();
    expect(noteWrapper.note.text).toBe('asdf\n');
    expect(noteWrapper.selectionStart).toBe(5);
  });

  it('bold1', () => {
    noteTextElement.value = '';
    noteWrapper.update(noteTextElement);
    noteWrapper.bold();
    expect(noteWrapper.note.text).toBe('****');
    expect(noteWrapper.selectionStart).toBe(2);
  });

  it('bold2', () => {
    noteTextElement.value = 'foo bar var';
    noteTextElement.selectionStart = 4;
    noteTextElement.selectionEnd = 7;
    noteWrapper.update(noteTextElement);
    noteWrapper.bold();
    expect(noteWrapper.note.text).toBe('foo **bar** var');
    expect(noteWrapper.selectionStart).toBe(4);
    expect(noteWrapper.selectionEnd).toBe(11);
  });

  it('bold3', () => {
    noteTextElement.value = 'foo bar\nvar';
    noteTextElement.selectionStart = 4;
    noteTextElement.selectionEnd = 10;
    noteWrapper.update(noteTextElement);
    noteWrapper.bold();
    expect(noteWrapper.note.text).toBe('foo **bar\nva**r');
    expect(noteWrapper.selectionStart).toBe(4);
    expect(noteWrapper.selectionEnd).toBe(14);
  });

  it('bold4', () => {
    noteTextElement.value = '**foo**';
    noteTextElement.selectionStart = 0;
    noteTextElement.selectionEnd = 7;
    noteWrapper.update(noteTextElement);
    noteWrapper.bold();
    expect(noteWrapper.note.text).toBe('foo');
    expect(noteWrapper.selectionStart).toBe(0);
    expect(noteWrapper.selectionEnd).toBe(3);
  });

  it('bold5', () => {
    noteTextElement.value = '****';
    noteTextElement.selectionStart = 0;
    noteTextElement.selectionEnd = 4;
    noteWrapper.update(noteTextElement);
    noteWrapper.bold();
    expect(noteWrapper.note.text).toBe('');
    expect(noteWrapper.selectionStart).toBe(0);
    expect(noteWrapper.selectionEnd).toBe(0);
  });

  it('enter1', () => {
    noteTextElement.value = '';
    noteWrapper.update(noteTextElement);
    noteWrapper.enter();
    expect(noteWrapper.note.text).toBe('\n');
    expect(noteWrapper.selectionStart).toBe(1);
  });

  it('enter2', () => {
    noteTextElement.value = '- x';
    noteTextElement.selectionStart = 3;
    noteWrapper.update(noteTextElement);
    noteWrapper.enter();
    expect(noteWrapper.note.text).toBe('- x\n- ');
    expect(noteWrapper.selectionStart).toBe(6);
  });

  it('enter3', () => {
    noteTextElement.value = '- \nasdf';
    noteTextElement.selectionStart = 2;
    noteWrapper.update(noteTextElement);
    noteWrapper.enter();
    expect(noteWrapper.note.text).toBe('\nasdf');
    expect(noteWrapper.selectionStart).toBe(0);
  });

  it('enter4', () => {
    noteTextElement.value = '- as';
    noteTextElement.selectionStart = 3;
    noteWrapper.update(noteTextElement);
    noteWrapper.enter();
    expect(noteWrapper.note.text).toBe('- a\n- s');
    expect(noteWrapper.selectionStart).toBe(6);
  });

  it('enter5', () => {
    noteTextElement.value = '- as';
    noteTextElement.selectionStart = 2;
    noteWrapper.update(noteTextElement);
    noteWrapper.enter();
    expect(noteWrapper.note.text).toBe('- \n- as');
    expect(noteWrapper.selectionStart).toBe(5);
  });

  it('enter6', () => {
    noteTextElement.value = '- ';
    noteTextElement.selectionStart = 2;
    noteWrapper.update(noteTextElement);
    noteWrapper.enter();
    expect(noteWrapper.note.text).toBe('');
    expect(noteWrapper.selectionStart).toBe(0);
  });

  it('addImageUrl1', () => {
    noteTextElement.value = '';
    noteTextElement.selectionStart = 0;
    noteWrapper.update(noteTextElement);
    noteWrapper.imageUrl("http://image");
    expect(noteWrapper.note.text).toBe('<img src="http://image" alt="image" width="100%"/>');
    expect(noteWrapper.selectionStart).toBe(50);
  });

  it('addImageUrl2', () => {
    noteTextElement.value = 'foo\n\nbar';
    noteTextElement.selectionStart = 4;
    noteWrapper.update(noteTextElement);
    noteWrapper.imageUrl("http://image");
    expect(noteWrapper.note.text).toBe('foo\n<img src="http://image" alt="image" width="100%"/>\nbar');
    expect(noteWrapper.selectionStart).toBe(54);
  });

  it('addCollapsable1', () => {
    noteTextElement.value = '<{foo\nbar\n}>';
    noteWrapper.update(noteTextElement);
    const expected = '\n<details><summary>foo</summary>\nbar\n\n</details>\n';
    const actual = noteWrapper.expendCollapsable(noteWrapper.note.text);
    expect(expected).toBe(actual);
  });

  it('addCollapsable2', () => {
    noteTextElement.value = '123<{foo\nbar\n}>456';
    noteWrapper.update(noteTextElement);
    const expected = '123\n<details><summary>foo</summary>\nbar\n\n</details>\n456';
    const actual = noteWrapper.expendCollapsable(noteWrapper.note.text);
    expect(expected).toBe(actual);
  });

  it('addCollapsable3', () => {
    noteTextElement.value = '123<{foo\nbar\n}>456<{as\ndf}>';
    noteWrapper.update(noteTextElement);
    const expected = '123\n<details><summary>foo</summary>\nbar\n\n</details>\n456\n<details><summary>as</summary>\ndf\n</details>\n';
    const actual = noteWrapper.expendCollapsable(noteWrapper.note.text);
    expect(expected).toBe(actual);
  });
});
