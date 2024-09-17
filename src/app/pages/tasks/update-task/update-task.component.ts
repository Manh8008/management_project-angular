import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ITask } from '../../../interface/itask';
import { ProjectService } from '../../../core/services/project.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { TaskService } from '../../../core/services/task.service';
import { PermissionService } from '../../../core/services/permission-service.service';

@Component({
    selector: 'app-update-task',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink, RouterModule],
    templateUrl: './update-task.component.html',
    styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
    task: ITask | any = {};
    employeesData: any[] = [];
    employeeIds: any = [];
    projectsData: any[] = [];
    id: any;
    showForm: boolean = true;

    constructor(
        private projectService: ProjectService,
        private employeeService: EmployeeService,
        private taskService: TaskService,
        private permissionService: PermissionService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.projectService.setApiUrl('http://localhost:3000/projects');
        this.employeeService.setApiUrl('http://localhost:3000/employees');
        this.taskService.setApiUrl('http://localhost:3000/tasks');
        this.getEployees();
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.getProjects();
        this.getEployees();
        this.getTask(this.id);
        this.checkRoleUser();

    }

    getTask(id: any) {
        this.taskService.getItem(this.id).subscribe((data: any) => {
            this.task = data.result[0];
        });
    }

    checkRoleUser() {
        this.showForm = this.permissionService.checkUserRoleAndRedirect('leader', 'tasks');
    }


    getProjects() {
        this.projectService.getItems().subscribe((data: any) => {
            this.projectsData = data.result.sort((a: any, b: any) => b.id - a.id);
        });
    }

    getEployees() {
        this.employeeService.getItems().subscribe((data: any) => {
            this.employeesData = data.result.sort((a: any, b: any) => b.id - a.id);
        });
    }

    updateTask(updateTaskForm: any) {
        if (updateTaskForm.valid) {
            this.taskService.updateItem(updateTaskForm.value, this.id).subscribe(() => {
                this.router.navigate(['/tasks']);
            });
            console.log(updateTaskForm.value);

        }
    }
    onBack() {
        this.router.navigate(['/tasks']);
    }
}
