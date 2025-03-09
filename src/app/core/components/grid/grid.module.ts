import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';   
import { GridComponent } from './grid.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  exports: [GridComponent]
})
export class GridModule { }
