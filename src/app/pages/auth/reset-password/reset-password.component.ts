import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    token: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.resetPasswordForm = this.fb.group({
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validator: this.passwordMatchValidator });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.token = params['token'];
        });
    }

    passwordMatchValidator(form: FormGroup) {
        return form.get('newPassword')?.value === form.get('confirmPassword')?.value
            ? null : { 'mismatch': true };
    }

    onSubmit() {
        if (this.resetPasswordForm.valid) {
            const newPassword = this.resetPasswordForm.get('newPassword')?.value;
            this.authService.resetPassword(this.token, newPassword);
        }
    }
}
