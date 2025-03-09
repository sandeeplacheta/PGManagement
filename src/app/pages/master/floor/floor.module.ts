import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorRoutingModule } from './floor-routing.module';
import { FloorComponent } from './floor.component';


@NgModule({
  declarations: [
    FloorComponent
  ],
  imports: [
    CommonModule,
    FloorRoutingModule
  ]
})
export class FloorModule { }
