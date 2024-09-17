import { Component } from '@angular/core';
import { IProject } from '../../interface/iproject';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ProjectService } from '../../core/services/project.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    projects: IProject[] = [];
    allProjects: IProject[] = [];

    constructor(

        private authService: AuthService,
        private projectService: ProjectService,
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
}
