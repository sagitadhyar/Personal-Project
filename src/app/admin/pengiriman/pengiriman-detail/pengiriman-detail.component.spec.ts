import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengirimanDetailComponent } from './pengiriman-detail.component';

describe('PengirimanDetailComponent', () => {
  let component: PengirimanDetailComponent;
  let fixture: ComponentFixture<PengirimanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengirimanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengirimanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
