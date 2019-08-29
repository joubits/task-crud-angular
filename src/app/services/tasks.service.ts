import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Task } from '../interfaces/task'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  APIENDPOINT = 'http://localhost:8888/php_apiRest_task/api/task/';
  taskList: Task[] = [];
  task: Task;

  constructor( private http: HttpClient ) {
  }

  save(task: Task) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.APIENDPOINT + 'create.php', task, {headers: headers});
  }

  readTask(id) {
    let params = new HttpParams().set("id",id);
    this.http.get( this.APIENDPOINT + 'read_single.php', { params: params })
      .subscribe( (task: Task) => {
        this.task = task;
        console.log(this.task);
      } );
  }

  put(task: Task) {
    //let params = new HttpParams().set("paramName",paramValue).set("paramName2", paramValue2); //Create new HttpParams
    //this.http.get(url, {headers: headers, params: params}); 
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.APIENDPOINT + 'update.php/' + task.id, task, {headers: headers});
  }

  delete(id) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.delete(this.APIENDPOINT + 'delete.php/' + id, {headers: headers}).subscribe( (data)=> {
        alert("Task is removed");
        console.log(data);
      }, (error) => { 
        console.log(error);
        alert("An error happend");
      });
      //console.log(this.taskList);
  }

  // new version
  getAll(): Observable<Task[]> {
    return this.http.get(`${this.APIENDPOINT}/read.php`).pipe(
      map((res: Task[]) => {
        this.taskList = res;
        return this.taskList;
    }),
    catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  // store(taskSave: Task): Observable<Task[]> {
  //   return this.http.post(`${this.APIENDPOINT}/create.php`, { data: taskSave })
  //     .pipe(map((res) => {
  //       this.cars.push(res['data']);
  //       return this.cars;
  //     }),
  //     catchError(this.handleError));
  // }

  // save(task: Task) {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.http.post(this.APIENDPOINT + 'create.php', task, {headers: headers});
  // }
}
