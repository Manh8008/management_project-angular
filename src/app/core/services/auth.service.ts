import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private jwtHelper = new JwtHelperService();
    constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object,) { }
    private isAuthenticated = false;
    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    login(email: string, password: string) {
        const user = {
            email: email,
            password: password,
        };

        this.http
            .post('http://localhost:3000/users/login', user)
            .subscribe({
                next: (response: any) => {
                    if (isPlatformBrowser(this.platformId)) {
                        const token = response.token;
                        if (token) {
                            localStorage.setItem('access_token', token);
                            this.userSubject.next(this.getUserInfo());
                            this.isAuthenticated = true;
                            this.router.navigate(['']);
                        }
                    }
                },
                error: (error) => {
                    console.error('Login error:', error);
                    alert(error.error.error); // Hiển thị thông báo lỗi từ server
                }
            });
    }

    register(name: string, email: string, password: string, role: string, region: string) {
        const user = { name, email, password, role, region };
        this.http.post('http://localhost:3000/users/register', user).subscribe((response: any) => {
            if (response.token) {
                alert('Đăng kí thành công !')
                this.router.navigate(['/login']);
            } else {
                console.error(response.message);
            }
        });
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('access_token');
            this.userSubject.next(null);
            this.isAuthenticated = false;
            this.router.navigate(['/login']);
        }
    }

    forgotPassword(email: string) {
        let isLoading = false;
        this.http.post('http://localhost:3000/users/forgotPassword', { email })
            .subscribe({
                next: (response: any) => {
                    alert('Email sent! Please check your inbox to reset your password.');
                },
                error: (error) => {
                    console.error('Forgot password error:', error);
                    alert(error.error.error);
                }
            });
    }


    resetPassword(token: string, newPassword: string) {
        const data = { token, newPassword };

        this.http.post('http://localhost:3000/users/resetPassword', data)
            .subscribe({
                next: (response: any) => {
                    alert('Đặt lại mật khẩu thành công!');
                    this.router.navigate(['/login']);
                },
                error: (error) => {
                    console.error('Reset password error:', error);
                    alert(error.error.error);
                }
            });
    }


    getUserInfo(): any {
        if (isPlatformBrowser(this.platformId)) {
            let result: any = null;
            try {
                let token: any = localStorage.getItem('access_token');
                const decodedToken = this.jwtHelper.decodeToken(token);
                result = decodedToken;

            } catch (error) {
                console.error('Error decoding token:', error);
            }
            return result;
        }
        return null;
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('access_token');
            let result: boolean = false;
            try {
                result = !!token && !this.jwtHelper.isTokenExpired(token);
            } catch { }
            return result;
        }
        return false;
    }
}
