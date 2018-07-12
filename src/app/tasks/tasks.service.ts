import { Injectable, OnDestroy } from '@angular/core';
import { Task } from './task.model';
import { Observable, BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable()

export class TasksService implements OnDestroy {

    private _tasks: Task[] = [];
    private _taskSource: BehaviorSubject<Task[]>;
    private _interval: Subscription;
    public tasksObserver: Observable<Task[]>;

    constructor() {
        this.mockData();
        this._taskSource = new BehaviorSubject<Task[]>(this._tasks);
        this.tasksObserver = this._taskSource.asObservable();
        let count: number = 1;

        this._interval = interval(20000).subscribe(() => {
            this.createTaskAndAddToList(count);
            count++;
        });
    }

    ngOnDestroy() {
        this._interval.unsubscribe();
    }

    public addTask(task: Task): void {
        this._tasks.push(task);
        this.notifyChanges();
    }

    public onTaskChanged(): void {
        this.notifyChanges();
    }

    public getNextId(): number {
        return this._tasks && this._tasks.length > 0 ? this._tasks[this._tasks.length - 1].id + 1 : 1;
    }

    public checkTitleNotTaken(title: string): boolean {
        if (!title) {
            return false;
        }
        let tasks = this._tasks.filter((item: Task) => item.title.toLowerCase() === title.toLowerCase());
        return tasks && tasks.length > 0;
      }

    private notifyChanges(): void {
        this._taskSource.next(this._tasks);
    }

    private mockData(): void {
        let task1 = new Task();
        task1.id = 1;
        task1.title = "Test task 1";
        task1.description = "This is test task 1";
        task1.isDone = true;

        this._tasks.push(task1);

        let task2 = new Task();
        task2.id = 2;
        task2.title = "Test task 2";
        task2.description = "This is test task 2";

        this._tasks.push(task2);
    }

    private createTaskAndAddToList(count: number): void {
        let task = new Task();
        task.id = this.getNextId();
        task.title = "Task title " + count;
        task.description = "Task description " + count;

        this._tasks.push(task);
        this.notifyChanges();
    }
}