import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChatFilterComponent } from './modal-chat-filter.component';

describe('ModalChatFilterComponent', () => {
  let component: ModalChatFilterComponent;
  let fixture: ComponentFixture<ModalChatFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChatFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
