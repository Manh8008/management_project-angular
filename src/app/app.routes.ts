import { Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employeesInit/employees.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectsComponent } from './pages/projects/projectInit/projects.component';
import { TasksComponent } from './pages/tasks/taskInit/tasks.component';
import { EmployeesDetailComponent } from './pages/employeesDetail/employees-detail.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AddProjectComponent } from './pages/projects/projectAdd/add-project.component';
import { UpdateProjectComponent } from './pages/projects/projectUpdate/update-project.component';
import { AddTaskComponent } from './pages/tasks/add-task/add-task.component';
import { UpdateTaskComponent } from './pages/tasks/update-task/update-task.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { UpdateEmployeeComponent } from './pages/employees/update-employee/update-employee.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent, canActivate: [AuthGuard],
    },
    {
        path: 'employees',
        component: EmployeesComponent,
    },
    {
        path: 'employees/:id',
        component: EmployeesDetailComponent,
    }
    ,
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
    },
    {
        path: 'resetPassword',
        component: ResetPasswordComponent,
    },
    {
        path: 'projects',
        component: ProjectsComponent,
    },
    {
        path: 'projects/addProject',
        component: AddProjectComponent,
    },
    {
        path: 'projects/updateProject/:id',
        component: UpdateProjectComponent,
    },
    {
        path: 'tasks',
        component: TasksComponent,
    },
    {
        path: 'tasks/addTask',
        component: AddTaskComponent,
    },
    {
        path: 'tasks/updateTask/:id',
        component: UpdateTaskComponent,
    },
    {
        path: 'updateEmployee/:id',
        component: UpdateEmployeeComponent,
    },
    {
        path: '**',
        component: NotfoundComponent,
    },



];
