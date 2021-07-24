import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PembelianDetailComponent } from './pembelian-detail.component';

describe('PembelianDetailComponent', () => {
  let component: PembelianDetailComponent;
  let fixture: ComponentFixture<PembelianDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PembelianDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PembelianDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
