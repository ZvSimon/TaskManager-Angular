import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemoAngularMaterailModule } from 'src/app/DemoAngularMaterialModule';
import { HttpClientModule } from '@angular/common/http';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewTaskDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    DemoAngularMaterailModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EmployeeModule { }
