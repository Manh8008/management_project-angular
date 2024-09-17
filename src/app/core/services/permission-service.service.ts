import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PermissionService {
    constructor(private authService: AuthService, private router: Router) { }

    checkUserRoleAndRedirect(role: string, redirectPath: string) {
        const userInfo = this.authService.getUserInfo();
        const userRole = userInfo.role;

        if (userRole && userRole !== role) {
            alert('Bạn không có quyền truy cập!');
            this.router.navigate([redirectPath]);
            return false;
        }
        return true;
    }
}
