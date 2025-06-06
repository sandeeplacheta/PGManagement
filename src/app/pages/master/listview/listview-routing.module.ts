import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListviewComponent } from './listview.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'grid', component: ListviewComponent },
  { path: 'list', component: ListviewComponent },
  { path: 'form', component: ListviewComponent },
  { path: 'form/:id', component: ListviewComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListviewRoutingModule { }
