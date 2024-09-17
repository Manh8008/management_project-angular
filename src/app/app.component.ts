import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        CommonModule,
        RouterOutlet,
        FooterComponent,
        HeaderComponent,
        HttpClientModule,
        RouterModule,
    ]
})
export class AppComponent {
    title = 'myApp';
    constructor(private router: Router) { }

    isAuthPage(): boolean {
        const authPages = ['/register', '/login', '/forgotPassword', '/resetPassword'];
        const currentUrl = this.router.url.split('?')[0]; // Lấy phần trước ký tự '?'
        return authPages.includes(currentUrl);
    }

}
