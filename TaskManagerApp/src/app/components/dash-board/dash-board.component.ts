import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task-service.service';
import { Task } from '../../models/Task'

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  tasks:Task[];

  task:Task;

  tareasPlanned:number = 0;
  tareasPlannedTime:number = 0;

  tareasCompleted:number = 0;
  tareasCompletedTime:number = 0;
  
  tareasInProgress:number = 0;
  tareasInProgressTime:number = 0;
  
  Totals:number;
  TotalsTime:number;

  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks =>{
      this.tasks = tasks;
      console.log(this.tasks);

      for(let i=0; i<tasks.length; i++){
        if(tasks[i].state == "planned"){
          this.tareasPlanned++;
          this.tareasPlannedTime += Number(tasks[i].estimate);
        } else if(tasks[i].state == "completed") {
          this.tareasCompleted++;
          this.tareasCompletedTime += Number(tasks[i].estimate);
        } else if(tasks[i].state == "InProgress") {
          this.tareasInProgress++;
          this.tareasInProgressTime += Number(tasks[i].estimate);
        } 
      }
      this.Totals = this.tareasCompleted + this.tareasInProgress + this.tareasPlanned;
      this.TotalsTime = this.tareasPlannedTime + this.tareasCompletedTime + this.tareasInProgressTime;
    })
  }


}
