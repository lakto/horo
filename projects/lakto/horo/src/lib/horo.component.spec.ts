import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroComponent } from './horo.component';

describe('HoroComponent', () => {
  let component: HoroComponent;
  let fixture: ComponentFixture<HoroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
