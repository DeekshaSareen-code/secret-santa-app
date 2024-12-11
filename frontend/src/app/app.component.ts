import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from './api.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name: string = '';
  message: string = '';
  isAddNamesPage: boolean = false;
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    // Subscribe to route changes to detect when we're on the add-names page
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAddNamesPage = event.urlAfterRedirects === '/add-names';
      });
  }
  onContinue(): void {
    if (this.name.trim()) {
      // Call the API to add the name to the backend
      this.apiService.addName(this.name).subscribe(
        (response) => {
          console.log('Name added successfully:', response);
          this.router.navigate(['/add-names']);
        },
        (error) => {
          console.error('Error adding name:', error);
          this.message = 'Failed to add name. Please try again!';
        }
      );
    } else {
      this.message = 'Name is required!';
    }
  }
}
