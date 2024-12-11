import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-names',
  templateUrl: './add-names.component.html',
  standalone: false,
  styleUrls: ['./add-names.component.scss'],
})
export class AddNamesComponent implements OnInit {
  names: string[] = [];
  newName: string = '';
  message: string = '';
  editingIndex: number | null = null;
  editingName: string = '';
  confirmationUrl: string = '';
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Fetch existing names if any, from the backend
    this.apiService.getNames().subscribe(
      (names) => {
        this.names = names;
      },
      (error) => {
        console.error('Error fetching names:', error);
      }
    );
  }

  addName(): void {
    if (this.newName) {
      // Check if name already exists (case-insensitive)
      if (
        this.names.some(
          (n) => n.toLowerCase() === this.newName.trim().toLowerCase()
        )
      ) {
        this.newName = '';
        this.message = 'Name already exists!';
      } else {
        this.message = '';
        this.names.push(this.newName.trim());
        this.newName = ''; // Clear input field after adding name
      }
    } else {
      this.message = 'Name cannot be empty!';
    }
  }

  editName(index: number): void {
    this.editingIndex = index;
    this.editingName = this.names[index]; // Store the name to edit
  }

  saveEditedName(): void {
    if (this.editingName && this.editingIndex !== null) {
      // Check if name already exists (case-insensitive)
      if (
        this.names.some(
          (n, idx) =>
            idx !== this.editingIndex &&
            n.toLowerCase() === this.editingName.trim().toLowerCase()
        )
      ) {
        this.message = 'Name already exists!';
      } else {
        // Update the name
        this.names[this.editingIndex] = this.editingName.trim();
        this.editingIndex = null; // Reset editing index
        this.editingName = ''; // Clear the input field
        this.message = ''; // Clear the error message
      }
    }
  }

  cancelEdit(): void {
    this.editingIndex = null; // Reset editing index
    this.editingName = ''; // Clear the input field
  }

  removeName(index: number): void {
    this.names.splice(index, 1); // Remove the name at the specified index
  }

  confirmNames(): void {
    // Check if there are at least 3 names in the list
    if (this.names.length < 3) {
      this.message =
        'There should be at least 3 members in the group to draw names.';
      return;
    }

    // Send the names to the backend to create the Secret Santa pairs
    this.apiService.createSecretSantaPairs(this.names).subscribe({
      next: (response) => {
        this.confirmationUrl = `http://localhost:4200/participant/${response.groupId}`;
      },
      error: (error) => {
        console.error('Error creating pairs:', error);
        this.message = 'Failed to create pairs. Please try again!';
      },
      complete: () => {
        this.message = '';
      },
    });
  }
}
