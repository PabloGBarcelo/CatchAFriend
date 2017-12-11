import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasignupComponent } from './extrasignup.component';

describe('ExtrasignupComponent', () => {
  let component: ExtrasignupComponent;
  let fixture: ComponentFixture<ExtrasignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrasignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrasignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
