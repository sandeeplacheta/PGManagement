import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolesComponent } from './userroles.component';

describe('UserrolesComponent', () => {
  let component: UserrolesComponent;
  let fixture: ComponentFixture<UserrolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserrolesComponent]
    });
    fixture = TestBed.createComponent(UserrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
