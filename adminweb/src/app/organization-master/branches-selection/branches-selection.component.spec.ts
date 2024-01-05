import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesSelectionComponent } from './branches-selection.component';

describe('BranchesSelectionComponent', () => {
  let component: BranchesSelectionComponent;
  let fixture: ComponentFixture<BranchesSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
