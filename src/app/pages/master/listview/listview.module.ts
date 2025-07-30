import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListviewRoutingModule } from './listview-routing.module';
import { ListviewComponent } from './listview.component';


@NgModule({
  declarations: [
    ListviewComponent
  ],
  imports: [
    CommonModule,
    ListviewRoutingModule
  ]
})
export class ListviewModule { }
