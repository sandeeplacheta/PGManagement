import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInvoiceitemComponent } from './form-invoiceitem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultilineFormComponent } from '../multiline-form/multiline-form.component';
import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';





@NgModule({
  declarations: [FormInvoiceitemComponent,MultilineFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTooltip,
    NgSelectModule
  ],
  exports : [FormInvoiceitemComponent]
})
export class FormInvoiceModule { }
