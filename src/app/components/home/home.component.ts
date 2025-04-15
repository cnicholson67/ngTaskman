import { Component, ViewChild, Injector, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';
import { Task } from '../../models/Tasks'
import { TaskService } from '../../services/task.service'
import { ModalEditTaskComponent } from '../../components/modal-edit-task/modal-edit-task.component'
@Component({
  selector: 'app-home',
  imports: 
  [
    MatTabsModule, 
    MatTableModule, 
    MatSortModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatTableModule,
    MatPaginatorModule,
    MatTable,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  @ViewChild('TaskTable', { read: MatSort, static: true }) TaskSort: MatSort;
  TaskList: MatTableDataSource<Task>
  constructor(private taskService:TaskService, private modalService: NgbModal, private injector: Injector){
    this.TaskSort = new MatSort()
    this.TaskList = new MatTableDataSource<Task>(taskService.Tasks)
    this.TaskList.sort = this.TaskSort 
  }
  EditTask(t:Task){
    console.log(t);
    var m = this.modalService.open(ModalEditTaskComponent, { size: 'xl', backdrop: 'static', injector: this.injector })
    m.componentInstance.title = "Edit Task";
    m.componentInstance.Task = t;
    m.result.then(r=>{
      if(!r){
        this.taskService.Reload()
      }
      this.TaskList = new MatTableDataSource<Task>(this.taskService.Tasks)
      this.TaskList.sort = this.TaskSort 
    })
  }
  DeleteTask(t:Task){
    Swal.fire({
      title: "Are you sure?",
      html: "This delete the task, <strong>" + t.Name + "</strong>! <h4>You Cannot undo this.</h4>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Continue!",
      cancelButtonText: "No, Cancel!"
      }).then(r=>{
        if (r.isConfirmed) {
          this.taskService.Delete(t.Id)
          this.TaskList = new MatTableDataSource<Task>(this.taskService.Tasks)
          this.TaskList.sort = this.TaskSort 
        }
      });
  }
  NewTask(){
    var m = this.modalService.open(ModalEditTaskComponent, { size: 'xl', backdrop: 'static', injector: this.injector })
    m.componentInstance.title = "New Task";
    m.componentInstance.Task = new Task();
    m.result.then(r=>{
      this.TaskList = new MatTableDataSource<Task>(this.taskService.Tasks)
      this.TaskList.sort = this.TaskSort 
    })
  }
  ClearTasks(){
    Swal.fire({
      title: "Are you sure?",
      html: "This delete ALL yor tasks! <h4>You Cannot undo this.</h4>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Continue!",
      cancelButtonText: "No, Cancel!"
      }).then(r=>{
        if (r.isConfirmed) {
          this.taskService.DeleteAllTasks();
          this.TaskList = new MatTableDataSource<Task>(this.taskService.Tasks)
          this.TaskList.sort = this.TaskSort 
        }
    });
  }
  sortData(e:any,i:any){
    let srt = i.sort
    srt.active = e.active;
    srt.direction = e.direction;
    i.sort = srt
  }
ngAfterViewInit(): void {
  this.TaskList.sort = this.TaskSort 
}
}
