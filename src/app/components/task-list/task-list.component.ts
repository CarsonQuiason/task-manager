import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Task from 'src/app/models/task.model'; 
import { TaskService } from 'src/app/services/task.service';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Output() rfList: EventEmitter<any> = new EventEmitter();

  tasks?: Task[];
  currentTask: Task = {
    title: '',
    body: '',
    dueDate: '',
    state: 0,
  };
  currentIndex = -1;
  editing: boolean = false;
  editId = "";

  taskForm = this.formBuilder.group({
    title: '',
    body: '',
    dueDate: ''
  })

  taskFormObj: Task ={
    title: '',
    body: '',
    dueDate: ''
  }

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.retrieveTask();
  }

  refreshList(): void {
    // this.currentTask = undefined;
    this.currentIndex = -1;
    this.retrieveTask();
  }

  retrieveTask(): void {
    this.taskService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tasks = data;
    });
  }


  updateState(task: Task, state: number): void {
    this.currentTask = task;
    this.currentTask.state = state;
    const data = {
      state: this.currentTask.state,
    };
    if (this.currentTask.id) {
      this.taskService.update(this.currentTask.id, data)
        .then(() => console.log('The Task was updated successfully!' ))
        .catch(err => console.log(err));
    }
  }

  deleteTask(task: Task): void {
    this.currentTask = task;
    if (this.currentTask.id) {
      this.taskService.delete(this.currentTask.id)
        .then(() => 
          console.log('The task was deleted successfully!'))
        .catch(err => console.log(err));
    }
  }

  submitEdit(task: Task){
    this.currentTask = task;
    if(this.currentTask.id){
      this.taskFormObj.title = this.taskForm.get('title')?.value;
      this.taskFormObj.body = this.taskForm.get('body')?.value;
      this.taskFormObj.dueDate = this.taskForm.get('dueDate')?.value;
      this.taskService.update(this.currentTask.id, this.taskFormObj);
      this.editing = false;
      this.editId = ""
    }
    
  }

  beginEdit(task: Task){
    this.editId = task.id || "";
  }

  cancelEdit(){
    this.editId = ""
  }

}
