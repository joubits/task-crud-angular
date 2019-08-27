import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  task: Task

  constructor() { }

  ngOnInit() {
  }
  
  // Save Task
  saveTask(){

  }

}
