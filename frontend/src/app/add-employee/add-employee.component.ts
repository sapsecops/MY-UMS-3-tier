import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee = { name: '', email: '', designation: '', salary: 0 };

  constructor(private employeeService: EmployeeService, private router: Router) { }

  addEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}