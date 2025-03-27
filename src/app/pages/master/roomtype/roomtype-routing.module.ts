import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomtypeComponent } from './roomtype.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'grid', component: RoomtypeComponent },
  { path: 'list', component: RoomtypeComponent },
  { path: 'form', component: RoomtypeComponent },
  { path: 'form/:id', component: RoomtypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomtypeRoutingModule { }
