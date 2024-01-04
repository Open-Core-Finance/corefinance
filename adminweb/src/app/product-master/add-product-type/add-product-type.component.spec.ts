import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductTypeComponent } from './add-product-type.component';

describe('AddProductCategoryComponent', () => {
  let component: AddProductTypeComponent;
  let fixture: ComponentFixture<AddProductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
