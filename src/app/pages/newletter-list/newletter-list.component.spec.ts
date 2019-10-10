import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewletterListComponent } from './newletter-list.component';

describe('NewletterListComponent', () => {
  let component: NewletterListComponent;
  let fixture: ComponentFixture<NewletterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewletterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewletterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
