import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineFormComponent } from './multiline-form.component';

describe('MultilineFormComponent', () => {
  let component: MultilineFormComponent;
  let fixture: ComponentFixture<MultilineFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultilineFormComponent]
    });
    fixture = TestBed.createComponent(MultilineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
