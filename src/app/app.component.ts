import { Component, OnInit, Renderer2 } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isEmployeeLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  isDarkMode: boolean = false;

  constructor(private router: Router, private renderer: Renderer2) {
    // Check for saved user preference
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.isDarkMode = theme === 'dark';
      this.updateTheme();
    }
  }

  ngOnInit(): void {
    this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();

    this.router.events.subscribe((event) => {
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    });
  }

  logout(): void {
    StorageService.signOut();
    this.router.navigateByUrl('/login');
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.updateTheme();
    // Save user preference
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  updateTheme(): void {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
