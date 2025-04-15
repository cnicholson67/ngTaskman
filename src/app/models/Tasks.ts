export class Task {
    Id: number;
    Name: string;
    Description: string;
    Status:string;
    Priority?:string;
    Due: Date;
    CreatedOn?: Date;
    ModifiedOn?: Date;
    Archived?: boolean;
    Hour:string;
    Minute:string;
    AMPM:string;
    constructor(){
        this.Id=0;
        this.Name = 'New Task'
        this.Description = ''
        this.Due = new Date()
        this.Status = 'Pending'
        this.Hour = "12"
        this.Minute = "0"
        this.AMPM = "AM"
    }
}