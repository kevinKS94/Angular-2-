import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() newTask: Task;
  @Output() addTask = new EventEmitter(); 
  @Output() cancel = new EventEmitter();  


  constructor() { }

  ngOnInit(): void {
  }

  onSave(){
    this.newTask.mark = false;
    this.newTask.id = Math.round(100000000*Math.random());
    console.log(this.newTask);
    this.addTask.emit(this.newTask);
  }


  onCancel(){
    this.cancel.emit();
  }

}
