import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInvoiceitemComponent } from './form-invoiceitem.component';

describe('FormInvoiceitemComponent', () => {
  let component: FormInvoiceitemComponent;
  let fixture: ComponentFixture<FormInvoiceitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormInvoiceitemComponent]
    });
    fixture = TestBed.createComponent(FormInvoiceitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
