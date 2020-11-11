import { Component, OnInit, EventEmitter } from '@angular/core';
import { IToggledTaskEvent } from 'src/app/models/IToggledTaskEvent';
import { TaskService } from 'src/app/services/task-service.service';
import { Task } from '../../models/Task';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  currentTask: Task;

  tasks:Task[];

  toggled:any;

  task:Task;

  markedTasks:Task[] = [];

  constructor(private taskService:TaskService) {}

  //Arranque:
  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks =>{
      this.tasks = tasks;
    })
  }

  //Cargar nueva tarea:
  newTask() {
    this.currentTask = new Task();
  }

  //Concluir carga de nueva tarea
  addTask(task:Task){
    this.taskService.addTask(task).subscribe(task =>{
      this.tasks.push(task);
    })
  }

  //Cancelar carga de nueva tarea
  onDone(){
    this.currentTask = undefined;
  }

  //Borrar tarea
  processToggled(toggleTaskEvent : IToggledTaskEvent){
    this.task = toggleTaskEvent.task;
    if(toggleTaskEvent.toggleValue === true){
      this.markedTasks.push(this.task);
    } else {
      const index = this.markedTasks.indexOf(this.task)
      if( index !== -1 ){
        this.markedTasks.splice(index, 1);
      }
    }
    console.log(this.markedTasks);
    return this.markedTasks;
  }

  //onDelete(markedTasks:Task[]){

  //   let completePromise = new Promise((resolve, reject) =>{
  //     let resultPromises = [];
  //     markedTasks.forEach(task => {
  //       let promise = this.taskService.deleteTask(task).toPromise();
  //       resultPromises.push(promise);
  //     });
  //     Promise.all(resultPromises)
  //       .then((actualResults : Task[]) =>{
  //         resolve();
  //       })
  //       .catch(err =>{
  //         console.log(err);
  //         reject();
  //       })
  //   })
  //   return completePromise;
  //}


  //   for(let i=0; i<markedTasks.length; i++){
  //       this.taskService.deleteTask(markedTasks[i]).subscribe();
  //   }
  //   setTimeout(() => {
  //     this.markedTasks = [];
  //     this.taskService.getTasks().subscribe(tasks =>{
  //       this.tasks = tasks;
  //     })
  //   }, 250);
  // }

  //VERSION DEFINITIVA YA QUE JSON SERVER CRASHEA SI SE MANDAN MUCHOS DATOS A LA VEZ
  recursiveDelete(markedTasks: Task[]): Promise<any>{
    let volverPromise = new Promise((resolve,reject)=>{
      if (markedTasks && markedTasks.length !== 0) {
        const promise = this.taskService.deleteTask(markedTasks[0]).toPromise();
        promise.then(() => {
          markedTasks.splice(0, 1);
          this.recursiveDelete(markedTasks)
        }).then(() => {resolve()})
        .catch((err) => {console.log(err); reject()})
        .catch((err) => {console.log(err)});
      }
    })
    return volverPromise
  }

  onDelete(markedTasks:Task[]){
    this.recursiveDelete(markedTasks).then(() => {
      setTimeout(() => {
        this.markedTasks = [];
        this.taskService.getTasks().toPromise().then(tasks =>{
          this.tasks = tasks;
        }).catch((err)=>{console.log(err)});
      }, 250);
    }).catch((err) => {console.log(err)});
  }
}
