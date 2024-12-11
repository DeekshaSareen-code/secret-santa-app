import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent {
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
