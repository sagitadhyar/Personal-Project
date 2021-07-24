import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermintaanComponent } from './permintaan.component';

describe('PermintaanComponent', () => {
  let component: PermintaanComponent;
  let fixture: ComponentFixture<PermintaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermintaanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermintaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
