import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserrolesRoutingModule } from './userroles-routing.module';
import { UserrolesComponent } from './userroles.component';


@NgModule({
  declarations: [
    UserrolesComponent
  ],
  imports: [
    CommonModule,
    UserrolesRoutingModule
  ]
})
export class UserrolesModule { }
