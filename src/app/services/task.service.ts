import { Injectable } from '@angular/core';
import { Task } from '../models/Tasks'
@Injectable({ providedIn: 'root' }) //THIS LINE IS REALLY IMPORTANT
export class TaskService {
    Tasks: Array<Task> = []
    constructor(){
        let st = localStorage.getItem("tasks")
        if (st) {
            this.Tasks = JSON.parse(st);
        }
        this.Tasks.forEach(t=>{
            t.Due = new Date(t.Due)
        });
        localStorage.setItem('tasks',JSON.stringify(this.Tasks))
    }
    Reload(){
        let st = localStorage.getItem("tasks")
        if (st) {
            this.Tasks = JSON.parse(st);
        }
        this.Tasks.forEach(t=>{
            t.Due = new Date(t.Due)
        });
    }
    Save(task:Task){
        try{
            if(task.Id==0){
                let id:number = +1
                this.Tasks.forEach(t=>{
                    if(t.Id>=id){
                        id=id+1;
                    }
                });
                task.Id = id
                this.Tasks.push(task)
            }else{
                let et
                this.Tasks.forEach(t=>{
                    if(t.Id!=task.Id){
                        et = t
                    }
                });
            }
            localStorage.setItem('tasks',JSON.stringify(this.Tasks));
            return 'Saved'
        } catch(exc){
            return exc
        }
    }
    Delete(Id:number){
        let tmp:Task[]=[];
        this.Tasks.forEach(t=>{
            if(t.Id!=Id){tmp.push(t)}
        });
        this.Tasks = tmp;
        localStorage.setItem('tasks',JSON.stringify(this.Tasks));
    }
    DeleteAllTasks(){
        this.Tasks = [];
        localStorage.removeItem('tasks');
    }
}