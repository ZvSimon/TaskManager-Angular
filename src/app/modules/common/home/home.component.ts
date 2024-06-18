import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from "../../../auth/services/storage/storage.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    isEmployeeLoggedIn: boolean;
    isAdminLoggedIn: boolean;
    isDarkMode: boolean = false;

    constructor(private router: Router, private renderer: Renderer2) {
        const theme = localStorage.getItem('theme');
        if (theme) {
            this.isDarkMode = theme === 'dark';
            this.updateTheme();
        }
    }

    ngOnInit(): void {
        this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();

        this.router.events.subscribe(() => {
            this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
            this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        });
    }

    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        this.updateTheme();
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    updateTheme(): void {
        if (this.isDarkMode) {
            this.renderer.addClass(document.body, 'dark-theme');
        } else {
            this.renderer.removeClass(document.body, 'dark-theme');
        }
    }

    logout(): void {
        StorageService.signOut();
        this.router.navigateByUrl('/login');
    }
}
