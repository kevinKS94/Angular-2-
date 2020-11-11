import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.css']
})
export class PopupEditComponent implements OnInit {

  @Input() newEdit: Task;
  @Output() editTask = new EventEmitter(); 
  @Output() cancel = new EventEmitter();  

  constructor() { }

  ngOnInit(): void {
  }

  onSaveEdit(newEdit:Task){
    this.newEdit = newEdit;
    this.editTask.emit(this.newEdit);
  }

  onCancelEdit(){
    this.cancel.emit();
  }

}
