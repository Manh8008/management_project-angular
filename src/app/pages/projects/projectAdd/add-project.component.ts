import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IProject } from '../../../interface/iproject';
import { ProjectService } from '../../../core/services/project.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { PermissionService } from '../../../core/services/permission-service.service';

@Component({
    selector: 'app-add-project',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
    templateUrl: './add-project.component.html',
    styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent {
    projects: IProject[] = [];
    employees: any = [];
    employeeIds: any = [];
    showForm: boolean = true;

    addProjectForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        leaderId: new FormControl('', Validators.required),
        members: new FormControl('', Validators.required),
    });

    constructor(
        private projectService: ProjectService,
        private employeeService: EmployeeService,
        private permissionService: PermissionService,
        private router: Router
    ) {
        this.projectService.setApiUrl('http://localhost:3000/projects');
        this.employeeService.setApiUrl('http://localhost:3000/employees');
        this.loadInitialData();
        this.checkRoleUser();
    }

    loadInitialData() {
        this.projectService.getItems().subscribe((data: any) => {
            this.projects = data.result.sort((a: any, b: any) => b.id - a.id);
        });

        this.employeeService.getItems().subscribe((data: any) => {
            this.employees = data.result;
        });
    }

    checkRoleUser() {
        this.showForm = this.permissionService.checkUserRoleAndRedirect('leader', 'projects');
    }

    addProject() {
        if (this.addProjectForm.invalid) {
            this.markFormGroupTouched(this.addProjectForm);
            return;
        }
        this.projectService.addItem(this.addProjectForm.value).subscribe(() => {
            this.closeModal();
            this.router.navigate(['projects']);
        });
    }

    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('new-project-modal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
        this.showForm = false;
    }

    onBack() {
        this.router.navigate(['projects']);
    }
}
