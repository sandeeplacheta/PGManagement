import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartytypeloaderComponent } from './partytypeloader.component';

describe('PartytypeloaderComponent', () => {
  let component: PartytypeloaderComponent;
  let fixture: ComponentFixture<PartytypeloaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartytypeloaderComponent]
    });
    fixture = TestBed.createComponent(PartytypeloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
