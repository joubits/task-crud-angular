import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/task'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  APIENDPOINT = 'http://localhost:8888/php_apiRest_task/api/task/';
  taskList: Task[] = []; 

  constructor( private http: HttpClient ) {
    this.readTasks();
  }

  private readTasks() {
    this.http.get(this.APIENDPOINT + 'read.php').subscribe( (tasks: Task[] ) => {
      this.taskList = tasks;
      console.log(this.taskList);
    } );
  }
}
