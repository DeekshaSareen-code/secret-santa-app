import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNamesComponent } from './add-names/add-names.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';
import { ViewParticipantComponent } from './view-participant/view-participant.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNamesComponent,
    StartComponent,
    ViewParticipantComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
