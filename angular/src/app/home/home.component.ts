import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  dashboardPass: string = '';

  // Checks the user has credentials, it will navigate to the dashboard
  onLogin(password: string) {
    if (password === '12345e') {
      const authToken = 'true ' + Math.random().toString(36).substr(2);
      localStorage.setItem('authToken', authToken);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Password is wrong!');
      this.router.navigate(['/']);
    }
  }
}
