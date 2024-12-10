// frontend/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  message: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getHello().subscribe((data) => {
      this.message = data;
    });
  }
}
