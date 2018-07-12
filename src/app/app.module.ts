import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToolbarModule } from './toolbar/toolbar.module';
import { TasksModule } from './tasks/tasks.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksService } from './tasks/tasks.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    TasksModule,
    BrowserAnimationsModule
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
