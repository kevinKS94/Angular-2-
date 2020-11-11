import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';

const routes:Routes = [
  {path: '', component: TaskListComponent},
  {path: 'dashBoard', component: DashBoardComponent}
] 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
