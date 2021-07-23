import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangDetailComponent } from './barang-detail.component';

describe('BarangDetailComponent', () => {
  let component: BarangDetailComponent;
  let fixture: ComponentFixture<BarangDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarangDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarangDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
