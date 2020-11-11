import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task:Task;
  @Output() toggled = new EventEmitter;

  toggleValue:boolean;

  taskAbierta: Task;

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
  }

  onToggle(){
    this.toggled.emit({task: this.task, toggleValue : this.toggleValue});
  }

  changeTask(task:Task){
    this.taskAbierta = task;
  }

  processEditTask(task:Task){
    this.taskService.editTask(task).subscribe(task => {
      this.task = task;
    })
  }

  processCancel(){
    this.taskAbierta = null;
  }

}
