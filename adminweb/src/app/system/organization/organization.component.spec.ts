import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolComponent } from './organization.component';

describe('SchoolComponent', () => {
  let component: SchoolComponent;
  let fixture: ComponentFixture<SchoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolComponent]
    });
    fixture = TestBed.createComponent(SchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
