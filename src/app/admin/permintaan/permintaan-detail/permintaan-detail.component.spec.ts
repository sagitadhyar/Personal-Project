import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermintaanDetailComponent } from './permintaan-detail.component';

describe('PermintaanDetailComponent', () => {
  let component: PermintaanDetailComponent;
  let fixture: ComponentFixture<PermintaanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermintaanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermintaanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
