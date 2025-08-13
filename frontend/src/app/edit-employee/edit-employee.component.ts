import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: any = {};
  id: number;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.employeeService.getEmployee(this.id).subscribe(data => {
      this.employee = data;
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}