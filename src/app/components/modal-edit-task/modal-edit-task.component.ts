import { Component, Output, EventEmitter, Injectable, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Task } from '../../models/Tasks'
import { TaskService } from '../../services/task.service'
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-modal-edit-task',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule, 
  ],
  templateUrl: './modal-edit-task.component.html',
  styleUrl: './modal-edit-task.component.css',
})
export class ModalEditTaskComponent implements OnInit {
  isMobile:boolean = false;
  public Task?: Task;
  Name:string="";
  title?:string;
  tDate: Date = new Date();

  Minutes:number[]=[];
  @Output() saved = new EventEmitter();
  constructor(private taskService:TaskService, public modal: NgbActiveModal, private deviceService: DeviceDetectorService){
    this.isMobile = deviceService.isMobile();
  }
  private formatDate(){
    console.log(this.tDate)
    let d: number = this.tDate.getDate()
    let m: number = this.tDate.getMonth()+1
    let y: number = this.tDate.getFullYear()
    this.Task!.Due  = new Date(y +'-' + m + '-' + d + ' ' + this.Task!.Hour + ':' + this.Task!.Minute + ' ' + this.Task!.AMPM)
  }
  dueChanged(d:Date){
    this.tDate = d;
    this.formatDate()
  }
  //Could Likely just have used 1 function, however, often times unique processes are needed for individual fieds, so better to just go ahead and bust them out.
  onSelectHour(value:string){
    this.formatDate()
  }
  onSelectMinute(value: string){
    this.formatDate()
  }
  onSelectAMPM(value: string){
    this.formatDate()
  }
  saveClick(){
    let errMessage: string = "";
    if(this.Task){
      if(this.Task.Name.length < 1 ){
        errMessage += "Task <strong>Name</strong> is Required<br/>"
      }
      if(errMessage.length>0){
        Swal.fire(
          {
            html:errMessage,
            icon: "error",
            title: "Input Error",
          }
        );
      }
      else
      {
        let dt = new Date()
        if(this.Task.Due<dt && this.Task.Id == 0){
          Swal.fire({
            title: "Are you sure?",
            text: "The Due Date is in the past!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Continue!",
            cancelButtonText: "No, Cancel!"
          }).then(r=>{
            if (r.isConfirmed) {
              this.taskService.Save(this.Task!)
              this.modal.close(this.Task)
            }
          });
        }
        else {
          this.taskService.Save(this.Task!)
          this.modal.close(this.Task)
        }
      }
    }
  }
  cancelClick(){
    this.modal.close()
  }
  ngOnInit(): void {
    if(!this.Task){
      this.Task = new Task();
    }else{
      this.tDate = new Date(this.Task.Due)
    }
    for (let i = 0; i < 60; i++) {
      this.Minutes.push(i)
    }
  }
}
