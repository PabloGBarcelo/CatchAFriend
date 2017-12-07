import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalPlanComponent } from './portal-plan.component';

describe('PortalPlanComponent', () => {
  let component: PortalPlanComponent;
  let fixture: ComponentFixture<PortalPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
