import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  task: Task = {
    title: '',
    body: '',
    author: '',
    category_id: 0
  };
  id: any;
  editing:boolean = false;

  error;
  success;
  constructor( private taskService: TasksService, private activatedRoute: ActivatedRoute  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id){
      this.editing = true;
      this.taskService.readTask(this.id);
      this.task = taskService.task;

    }else {
      this.editing = false;
    }
  }

  ngOnInit() {
  }

  saveTask($event) {
    console.log("Se va a guardar tarea?");
    $event.preventDefault();
    if(this.editing) {
      this.taskService.put(this.task).subscribe( (data)=> {
        alert("Task is updated");
        console.log(data);
      }, (error) => { 
        console.log(error);
        alert("An error happend");
      });
    } else {
      if(this.task.body){
        this.taskService.save(this.task).subscribe( (data)=> {
          alert("Task is created");
          console.log(data);
        }, (error) => { 
          console.log(error);
          alert("An error happend");
        });
      }
    }
  }

  // addTask(f) {
  //   this.error = '';
  //   this.success = '';

  //   this.taskService.store(this.task)
  //     .subscribe(
  //       (res: Task) => {
  //         // Update the list of cars
  //         this.task = res;

  //         // Inform the user
  //         this.success = 'Created successfully';

  //         // Reset the form
  //         f.reset();
  //       },
  //       (err) => this.error = err
  //     );
  // }

}
