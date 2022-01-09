import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder } from '@angular/forms';
import Task from 'src/app/models/task.model';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { }

  taskFormObj: Task ={
    title: '',
    body: '',
    dueDate: '',
    state: 0
  }

  addTaskForm = this.formBuilder.group({
    title: '',
    body: '',
    dueDate: ''
  })

  ngOnInit(): void {
  }

  addTask(){
    this.taskFormObj.title = this.addTaskForm.get('title')?.value;
    this.taskFormObj.body = this.addTaskForm.get('body')?.value;
    this.taskFormObj.dueDate = this.addTaskForm.get('dueDate')?.value;
    this.taskService.create(this.taskFormObj);
  }
}
