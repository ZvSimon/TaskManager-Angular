import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/modules/employee/service/employee.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss']
})
export class ViewTaskDetailsComponent {
  taskData: any;
  comments: any;
  taskId = this.activatedRoute.snapshot.params['id'];

  commentForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: [null, [Validators.required]],
    })
    this.getTaskById();
  }

  getTaskById() {
    this.adminService.getTaskById(this.taskId).subscribe(res =>{
      this.taskData = res;
      this.getCommentsByPost();
    }, error =>{
      this.matSnackBar.open("Something Went Wrong!!!!", "Ok")
    })
  }

  publishComment() {
    this.adminService.createComment(this.taskId, this.commentForm.get('content')?.value

    ).subscribe(
      (response) => {
        this.matSnackBar.open("Comment Published Successfully", "Ok");
        this.getCommentsByPost();
      },
      (error) => {
        // Handle the error
        console.error('Error creating comment:', error);
        this.matSnackBar.open("Something Went Wrong!!!!", "Ok")
      }
    );
  }

  getCommentsByPost() {
    this.adminService.getAllCommentsByTaskId(this.taskId).subscribe(res => {
      this.comments = res;
    }, error => {
      this.matSnackBar.open("Something Went Wrong!!!!", "Ok")
    })
  }
}
