import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChatsSelectedComponent } from './my-chats-selected.component';

describe('MyChatsSelectedComponent', () => {
  let component: MyChatsSelectedComponent;
  let fixture: ComponentFixture<MyChatsSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChatsSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChatsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
