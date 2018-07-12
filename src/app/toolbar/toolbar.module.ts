import { NgModule } from '@angular/core';
import { MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent,
  ],
  imports: [
    MatToolbarModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: []
})

export class ToolbarModule { }