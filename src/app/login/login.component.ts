import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // Importar el módulo de mat-input
import { MatFormFieldModule } from '@angular/material/form-field'; // Para utilizar FormField con mat-input
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-login',
  imports: [FormsModule,MatInputModule,MatFormFieldModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordFieldType: string = 'password'; 
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  constructor(private authService: AuthService, private router: Router) {}
  login() {
    console.log("el botón click a sido presionado");
    if (this.email === 'miguelgarrafag@gmail.com' && this.password === '123456') {
      this.authService.login();
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
