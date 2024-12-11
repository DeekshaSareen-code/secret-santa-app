import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNamesComponent } from './add-names/add-names.component';
import { StartComponent } from './start/start.component';
import { ViewParticipantComponent } from './view-participant/view-participant.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'participant/:groupId', component: ViewParticipantComponent },
  { path: 'add-names', component: AddNamesComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
