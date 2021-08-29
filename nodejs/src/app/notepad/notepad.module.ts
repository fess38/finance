import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotepadDetailComponent } from './notepad-detail/notepad-detail.component';
import { NotepadSidenavComponent } from './notepad-sidenav/notepad-sidenav.component';
import { NotepadStateService } from './notepad-state.service';

@NgModule({
  declarations: [
    NotepadSidenavComponent,
    NotepadDetailComponent,
    NoteDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    NotepadStateService,
    UserDataService
  ],
  exports: [
    NotepadSidenavComponent
  ]
})
export class NotepadModule {}
