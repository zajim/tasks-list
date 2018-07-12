import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';

import { Task } from './task.model'
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  public dataSource: MatTableDataSource<Task>;
  
  displayedColumns: string[] = ['isDone', 'id', 'title', 'description'];

  constructor(private _tasksService: TasksService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Task>();
    this._subscription = this._tasksService.tasksObserver.subscribe((tasks: Task[]) => {
      this.dataSource.data = tasks;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task && task.title && task.description) {
        task.id = this._tasksService.getNextId();
        this._tasksService.addTask(task);
      }
    });
  }

  onTaskChanged(): void {
    this._tasksService.onTaskChanged();
  }
}
