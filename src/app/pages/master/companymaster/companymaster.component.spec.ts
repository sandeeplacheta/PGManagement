import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymasterComponent } from './companymaster.component';

describe('CompanymasterComponent', () => {
  let component: CompanymasterComponent;
  let fixture: ComponentFixture<CompanymasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanymasterComponent]
    });
    fixture = TestBed.createComponent(CompanymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
