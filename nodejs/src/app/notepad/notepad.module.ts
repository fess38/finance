import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotepadDetailComponent } from './notepad-detail/notepad-detail.component';
import { NotepadSidenavComponent } from './notepad-sidenav/notepad-sidenav.component';

@NgModule({
  declarations: [
    NotepadSidenavComponent,
    NotepadDetailComponent,
    NoteDetailComponent
  ],
  imports: [
    MarkdownModule.forChild(),
    SharedModule
  ],
  providers: [
    UserDataService
  ],
  exports: [
    NotepadSidenavComponent
  ]
})
export class NotepadModule {}
