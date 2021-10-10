import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html'
})
export class ActionButtonsComponent {
  constructor() {}

  @Input() hiddenSaveButton = false;
  @Input() disabledSaveButton = false;
  @Input() hiddenDeleteButton = false;
  @Input() disabledDeleteButton = false;
  @Output() saveNotifier = new EventEmitter<void>();
  @Output() deleteNotifier = new EventEmitter<void>();
  isModalOpen = false;
}
