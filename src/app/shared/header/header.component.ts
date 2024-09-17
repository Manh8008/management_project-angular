import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    user: any = null;
    constructor(private authService: AuthService) { }
    ngOnInit(): void {
        this.user = this.authService.getUserInfo()
        if (this.user == null)
            this.authService.user$.subscribe((data) => {
                this.user = data;
            });
    }
    logOut() {
        this.authService.logout();
        this.user = null
    }
}
