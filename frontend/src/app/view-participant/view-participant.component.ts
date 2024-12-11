// view-participant.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-participant',
  standalone: false,
  templateUrl: './view-participant.component.html',
  styleUrls: ['./view-participant.component.scss'],
})
export class ViewParticipantComponent {
  groupId: string = '';
  firstName: string = '';
  lastName: string = '';
  receiverName: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('groupId')!;
  }

  findReceiver(): void {
    if (this.lastName.trim() === '') {
      this.lastName = ''; // Reset last name to an empty string if not provided
    }

    this.apiService
      .getReceiver(this.groupId, this.firstName, this.lastName)
      .subscribe({
        next: (response) => (this.receiverName = response.receiver),
        error: (e) =>
          (this.errorMessage =
            ' Error finding your Secret Santa partner. Please try again.'),
      });
  }

  closeApp(): void {
    this.router.navigate(['/']); // Navigate back to the main page
  }
}
