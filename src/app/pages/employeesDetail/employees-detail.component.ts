import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from '../../interface/iemployee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-employees-detail',
    standalone: true,
    templateUrl: './employees-detail.component.html',
    styleUrls: ['./employees-detail.component.css'],
    imports: [CommonModule, FormsModule, HttpClientModule]
})
export class EmployeesDetailComponent {
    detail: IEmployee[] = [

    ];


}
