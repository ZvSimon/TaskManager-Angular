import { Component } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  listOfTasks: any = [];

  constructor(
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {
    this.getTasksByUserId();
  }

  getTasksByUserId() {
    this.employeeService.getTasksByUserId().subscribe(res => {
      this.listOfTasks = res;
    })
  }

  updateStatus(id: number, status: string) {
    this.employeeService.updateTask(id, status).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open('Task updated successfully', 'Close', {
          duration: 5000
        });
        this.getTasksByUserId();
      } else {
        this.snackBar.open(res.message, 'ERROR', {
          duration: 5000
        });
      }
    })
  }

}
