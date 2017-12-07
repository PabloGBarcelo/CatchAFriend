import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastHourComponent } from './last-hour.component';

describe('LastHourComponent', () => {
  let component: LastHourComponent;
  let fixture: ComponentFixture<LastHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
