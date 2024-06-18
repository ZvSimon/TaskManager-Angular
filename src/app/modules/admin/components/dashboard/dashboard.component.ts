import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AdminService} from '../../services/admin.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    listOfTasks: any = [];
    searchTaskForm!: FormGroup;


    constructor(
        private snackBar: MatSnackBar,
        private fb: FormBuilder,
        private adminService: AdminService
    ) {
        this.searchTaskForm = this.fb.group({
            title: [null],

        })
        this.getAllTasks();
    }

    submitForm() {
        this.listOfTasks = [];
        const title = this.searchTaskForm.get('title')!.value;

        if (title) {
            this.adminService.searchTasks(title).subscribe(res => {
                this.listOfTasks = res;
            })
        } else {
            this.getAllTasks();
        }
    }

    getAllTasks() {
        this.adminService.getAllTasks().subscribe(res => {
            this.listOfTasks = res;
        })
    }

    deleteTask(id: number): void {
        this.adminService.deleteTask(id).subscribe((res) => {
            this.snackBar.open('Task deleted successfully', 'Close', {
                duration: 5000
            });
            this.getAllTasks();
        })
    }

    getButtonColor(status: string): string {
        switch (status.toLowerCase()) {
            case 'completed':
                return '#4caf50'; // Green
            case 'in progress':
                return '#ffeb3b'; // Yellow
            case 'pending':
                return '#f44336'; // Red
            case 'on hold':
                return '#ff9800'; // Orange
            case 'canceled':
                return '#9e9e9e'; // Grey
            case 'review':
                return '#2196f3'; // Blue
            case 'approved':
                return '#8bc34a'; // Light Green
            default:
                return '#607d8b'; // Default Blue Grey
        }
    }


}
