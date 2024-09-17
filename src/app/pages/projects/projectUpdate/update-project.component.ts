import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProject } from '../../../interface/iproject';
import { ProjectService } from '../../../core/services/project.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { PermissionService } from '../../../core/services/permission-service.service';

@Component({
    selector: 'app-update-project',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './update-project.component.html',
    styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
    project: IProject | any = {};
    employees: any = [];
    employeeIds: any = [];
    id: any;
    showForm: boolean = true;

    updateProjectForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        leaderId: new FormControl('', Validators.required),
        members: new FormControl('', Validators.required),
    });

    constructor(
        private projectService: ProjectService,
        private employeeService: EmployeeService,
        private router: Router,
        private permissionService: PermissionService,
        private route: ActivatedRoute
    ) {
        this.projectService.setApiUrl('http://localhost:3000/projects');
        this.employeeService.setApiUrl('http://localhost:3000/employees');
        this.getEployees();
    }

    ngOnInit(): void {
        this.getProject();
        this.checkRoleUser();
    }

    checkRoleUser() {
        this.showForm = this.permissionService.checkUserRoleAndRedirect('leader', 'projects');
    }

    getProject() {
        this.id = this.route.snapshot.params['id'];
        this.projectService.getItem(this.id).subscribe((data: any) => {
            this.project = data.result[0];
            console.log(this.project);
        });
    }

    getEployees() {
        this.employeeService.getItems().subscribe((data: any) => {
            this.employees = data.result.sort((a: any, b: any) => b.id - a.id);
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
    updateProject() {
        if (this.updateProjectForm.invalid) {
            this.markFormGroupTouched(this.updateProjectForm);
        }
        this.projectService.updateItem(this.updateProjectForm.value, this.id).subscribe(() => {
            this.closeModal();
            this.router.navigate(['/projects']);
        });
    }

    closeModal() {
        const modal = document.getElementById('update-project-modal');
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
        this.router.navigate(['/projects']);
    }
}
