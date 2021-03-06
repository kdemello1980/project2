import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../task-list/task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodosService } from '../services/todos.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
// import { SelectTaskComponent } from '../select-task/select-task.component';

interface Completed {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  form: FormGroup;
  // data: ITask;
  selectedComplete: boolean;
  foo: boolean;

  completedList: Completed[] = [
    { value: false, viewValue: 'Open'},
    { value: true, viewValue: 'Complete'}
  ];


  constructor(private dialogRef: MatDialogRef<UpdateTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ITask,
              private fb: FormBuilder,
              private tService: TodosService,
              private cd: ChangeDetectorRef,
    ) {
      this.foo = this.data.completed;

  }
  // constructor(){}

// I have to wrap conditionals in functions? WTF?
blargh(): void {
  if (this.foo === false){
    this.selectedComplete = this.completedList[0].value;
  } else {
    this.selectedComplete = this.completedList[1].value;
  }
}

ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data.id, []],
      title: [this.data.title, []],
      createdOn: [this.data.createdOn, []],
      description: [this.data.description, []],
      completed: [this.data.completed, []]
    });
    this.blargh();
  }

save(): void {
    this.tService.updateTodo(this.form.value).subscribe(
      response => {
      }
    );
    this.cd.detectChanges();
    this.dialogRef.close(this.form.value);
  }

close(): void {
    this.dialogRef.close();
  }

delete(): void {
  if (confirm('Are you sure you want to delete this task?\n' + this.data.title)) {
  this.tService.deleteTodo(this.form.value.id).subscribe(
    response => {
      this.cd.detectChanges();
      this.dialogRef.close(this.form.value);
    }
  );
  //this.cd.detectChanges();
  //this.dialogRef.close(this.form.value);
  }
}

}
