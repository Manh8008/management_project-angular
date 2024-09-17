import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../../interface/iemployee';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

    employeesData: IEmployee[] = [];
    allEmployeesData: IEmployee[] = [];
    search = '';

    constructor(private employeeService: EmployeeService, private authService: AuthService) {
        this.employeeService.setApiUrl(`http://localhost:3000/employees`);
    }
    ngOnInit(): void {
        this.loadEmployees();
    }

    loadEmployees() {
        this.employeeService.getItems().subscribe((data: any) => {
            this.allEmployeesData = data.result.sort((a: any, b: any) => b.id - a.id);
            this.employeesData = [...this.allEmployeesData];
        });
    }

    deleteEmployee(id: any) {

        const userInfo = this.authService.getUserInfo();
        if (userInfo && userInfo.role === 'leader') {

            if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
                this.employeeService.deleteItem(id)
                    .subscribe(() => {
                        this.loadEmployees();
                    });
            }

        } else {
            alert('Bạn không có quyền xóa dự án !');
        }
    }


    onSearch(event: Event): void {
        event.preventDefault();
        this.employeesData = this.allEmployeesData.filter((item) =>
            item.employee_name.toLowerCase().includes(this.search.toLowerCase())
        );
    }
}
