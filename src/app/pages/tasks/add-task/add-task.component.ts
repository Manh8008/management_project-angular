import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { PermissionService } from '../../../core/services/permission-service.service';
import { TaskService } from '../../../core/services/task.service';

@Component({
    selector: 'app-add-task',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']  // Note: this should be 'styleUrls' instead of 'styleUrl'
})
export class AddTaskComponent implements OnInit {
    employeesData: any[] = [];
    projectsData: any[] = [];
    showForm: boolean = true;

    addTaskForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        employeeId: new FormControl('', Validators.required),
        leaderId: new FormControl('', Validators.required),
        projectId: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
    });

    constructor(
        private projectService: ProjectService,
        private employeeService: EmployeeService,
        private permissionService: PermissionService,
        private taskService: TaskService,
        private router: Router
    ) {
        this.projectService.setApiUrl(`http://localhost:3000/projects`);
        this.employeeService.setApiUrl(`http://localhost:3000/employees`);
        this.taskService.setApiUrl(`http://localhost:3000/tasks`);
    }

    ngOnInit(): void {
        this.getProjects();
        this.getEmployees();
        this.checkRoleUser();
    }

    checkRoleUser() {
        this.showForm = this.permissionService.checkUserRoleAndRedirect('leader', 'projects');
    }

    getProjects() {
        this.projectService.getItems().subscribe((data: any) => {
            this.projectsData = data.result.sort((a: any, b: any) => b.id - a.id);
        });
    }

    getEmployees() {
        this.employeeService.getItems().subscribe((data: any) => {
            this.employeesData = data.result.sort((a: any, b: any) => b.id - a.id);
        });
    }

    addTask() {
        if (this.addTaskForm.invalid) {
            this.markFormGroupTouched(this.addTaskForm);
            return;
        }
        this.taskService.addItem(this.addTaskForm.value).subscribe(() => {
            this.closeModal();
            this.router.navigate(['/tasks']);
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
        const modal = document.getElementById('new-task-modal');
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
        this.closeModal();
        this.router.navigate(['/tasks']);
    }
}
