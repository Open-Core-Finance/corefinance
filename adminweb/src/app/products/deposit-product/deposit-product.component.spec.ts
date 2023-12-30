import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositProductComponent } from './deposit-product.component';

describe('DepositProductComponent', () => {
  let component: DepositProductComponent;
  let fixture: ComponentFixture<DepositProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
