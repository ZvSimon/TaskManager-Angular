import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {

  taskForm: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
  listOfProjects: any = ["PortFolio","TaskFlow","API Weather"];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      projectName: ['', Validators.required],
    });

    this.getAllUsers();
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe(res => {
      this.listOfEmployees = res;
    })
  }


  postTask(): void {
    if (this.taskForm.valid) {
      this.adminService.postTask(this.taskForm.value).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Task posted successfully', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000
          });
        }
      })
    } else {
      for (const i in this.taskForm.controls) {
        this.taskForm.controls[i].markAsDirty();
        this.taskForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
