import { Component } from '@angular/core';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule],
  providers: [UserService],
  standalone: true,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user = { name: '', email: '', phone: '' };

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService.addUser(this.user).subscribe(() => {
      alert('User added successfully!');
    });
  }

  onSendSecretSanta() {
    this.userService.sendSecretSantaEmails().subscribe(() => {
      alert('Secret Santa matches have been sent!');
    });
  }
}
