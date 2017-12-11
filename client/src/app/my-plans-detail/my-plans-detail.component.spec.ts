import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlansDetailComponent } from './my-plans-detail.component';

describe('MyPlansDetailComponent', () => {
  let component: MyPlansDetailComponent;
  let fixture: ComponentFixture<MyPlansDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPlansDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlansDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
