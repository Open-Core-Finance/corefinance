import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositAccountComponent } from './deposit-account.component';

describe('DepositAccountComponent', () => {
  let component: DepositAccountComponent;
  let fixture: ComponentFixture<DepositAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
