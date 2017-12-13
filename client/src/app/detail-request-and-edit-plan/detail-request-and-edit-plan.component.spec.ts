import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRequestAndEditPlanComponent } from './detail-request-and-edit-plan.component';

describe('DetailRequestAndEditPlanComponent', () => {
  let component: DetailRequestAndEditPlanComponent;
  let fixture: ComponentFixture<DetailRequestAndEditPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRequestAndEditPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRequestAndEditPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
