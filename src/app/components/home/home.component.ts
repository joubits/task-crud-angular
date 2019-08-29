import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskList: Task[];
  error: HttpErrorResponse

  constructor( private taskService: TasksService  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAll().subscribe( 
      (res:Task[]) => {
        this.taskList = res;
      },
      (err) => {
        this.error = err;
      });
  }

  delete(id) {
    //console.log(id);
    this.taskService.delete(id);
  }

}
