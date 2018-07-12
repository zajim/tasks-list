import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task } from '../tasks/task.model'
import { TasksService } from '../tasks/tasks.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  resolvedTasksCount: number = 0;
  unresolvedTasksCount: number = 0;

  constructor(private _tasksService: TasksService) { }

  ngOnInit() {
    this._subscription = this._tasksService.tasksObserver.subscribe((tasks: Task[]) => {
      this.resolvedTasksCount = tasks.filter((item: Task) => item.isDone).length;
      this.unresolvedTasksCount = tasks.filter((item: Task) => !item.isDone).length;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
