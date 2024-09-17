import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AddProjectComponent } from '../projectAdd/add-project.component';
import { UpdateProjectComponent } from '../projectUpdate/update-project.component';
import { IProject } from '../../../interface/iproject';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-projects',
    standalone: true,
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterLink,
        AddProjectComponent,
        UpdateProjectComponent,
    ],
})
export class ProjectsComponent implements OnInit {
    projects: IProject[] = [];
    allProjects: IProject[] = [];
    search = '';

    constructor(
        private projectService: ProjectService,
        private authService: AuthService,
    ) {
        this.projectService.setApiUrl(`http://localhost:3000/projects`);
    }

    ngOnInit(): void {
        this.loadProject();
    }

    loadProject() {
        this.projectService.getItems().subscribe((data: any) => {
            this.allProjects = data.result.sort((a: any, b: any) => b.id - a.id);
            this.projects = [...this.allProjects];
        });
    }

    deleteProject(id: any) {

        const userInfo = this.authService.getUserInfo();
        if (userInfo && userInfo.role === 'leader') {

            if (confirm('Bạn có chắc chắn muốn xóa?')) {
                this.projectService.deleteItem(id)
                    .subscribe(() => {
                        this.loadProject();
                    });
            }

        } else {
            alert('Bạn không có quyền xóa dự án !');
        }
    }

    onSearch(event: Event): void {
        event.preventDefault();
        this.projects = this.allProjects.filter((item) =>
            item.project_name.toLowerCase().includes(this.search.toLowerCase())
        );
    }
}
