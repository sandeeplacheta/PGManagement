import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanymasterComponent } from './companymaster.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'grid', component: CompanymasterComponent },
  { path: 'list', component: CompanymasterComponent },
  { path: 'form', component: CompanymasterComponent },
  { path: 'form/:id', component: CompanymasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanymasterRoutingModule { }
