import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartytypeloaderComponent } from './partytypeloader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PartytypeloaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    NgSelectModule
  ],
   exports: [PartytypeloaderComponent]
})
export class PartytypeloaderModule { }
