import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserrolesComponent } from './userroles.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'grid', component: UserrolesComponent },
  { path: 'list', component: UserrolesComponent },
  { path: 'form', component: UserrolesComponent },
  { path: 'form/:id', component: UserrolesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserrolesRoutingModule { }
