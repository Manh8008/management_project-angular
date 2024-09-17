import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee.service';
import { PermissionService } from '../../../core/services/permission-service.service';

@Component({
    selector: 'app-update-employee',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './update-employee.component.html',
    styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
    employee: any = {};
    id: any;
    showForm: boolean = true;

    constructor(
        private employeeService: EmployeeService,
        private permissionService: PermissionService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.employeeService.setApiUrl('http://localhost:3000/employees');
    }

    ngOnInit(): void {
        this.getEmployee();
        this.checkRoleUser();
    }

    checkRoleUser() {
        this.showForm = this.permissionService.checkUserRoleAndRedirect('leader', 'employees');
    }


    getEmployee() {
        this.id = this.route.snapshot.params['id'];
        this.employeeService.getItem(this.id).subscribe((data: any) => {
            this.employee = data.result[0];
            console.log(this.employee);
        });
    }

    updateEmployee(form: any) {
        if (form.valid) {
            this.employeeService.updateItem(form.value, this.id).subscribe(() => {
                this.closeModal();
                this.router.navigate(['/employees']);
            });
        }
    }

    closeModal() {
        const modal = document.getElementById('update-user-modal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
    }

    onBack() {
        this.closeModal();
        this.router.navigate(['/employees']);
    }
}
