import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.tasksUrl}`);
  }

  addTask(task:Task): Observable<any>{
    return this.http.post<Task>(this.tasksUrl, task, httpOptions);
  }

  deleteTask(task:Task): Observable<Task>{
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.delete<Task>(url, httpOptions); 
  }

  editTask(task:Task): Observable<Task>{
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }
}
