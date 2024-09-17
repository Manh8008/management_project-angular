import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../../interface/itask';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, RouterModule],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css'
})
export class TasksComponent {
    taskApi: any
    tasksData: ITask[] = [];
    allTasksData: ITask[] = [];
    search = '';

    constructor(private router: Router, private taskService: TaskService, private authService: AuthService) { }

    ngOnInit(): void {
        this.taskService.setApiUrl('http://localhost:3000/tasks');
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getItems().subscribe((data: any) => {
            this.allTasksData = data.result.sort((a: any, b: any) => b.id - a.id);
            this.tasksData = [...this.allTasksData];
        });
    }

    deleteItem(id: any) {
        const userInfo = this.authService.getUserInfo();
        if (userInfo && userInfo.role === 'leader') {
            if (confirm('Bạn có chắc chắn muốn xóa?')) {
                this.taskService.deleteItem(id).subscribe(() => {
                    this.loadTasks();
                });
            }
        } else {
            alert("Bạn không có quyền xóa nhiệm vụ");
        }


    }

    onSearch(event: Event): void {
        event.preventDefault();
        this.tasksData = this.allTasksData.filter((task) =>
            task.task_name.toLowerCase().includes(this.search.toLowerCase())
        );
    }
}
