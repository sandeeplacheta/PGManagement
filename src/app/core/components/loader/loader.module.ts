import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    NgSelectModule
  ],
  exports: [LoaderComponent]
})
export class LoaderModule { }
