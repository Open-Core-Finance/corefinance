import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepositProductComponent } from './add-deposit-product.component';

describe('AddDepositProductComponent', () => {
  let component: AddDepositProductComponent;
  let fixture: ComponentFixture<AddDepositProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDepositProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDepositProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
