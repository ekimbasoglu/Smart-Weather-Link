import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hideComponent: boolean = true;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Check if it's the dashboard page
    // and if the user has credentials
    if (this.router.url === '/dashboard') {
      // TODO: Check if the data recieved has plant is actually dry
      this.hideComponent = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
