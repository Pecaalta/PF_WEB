import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewletterFormComponent } from './newletter-form.component';

describe('NewletterFormComponent', () => {
  let component: NewletterFormComponent;
  let fixture: ComponentFixture<NewletterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewletterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewletterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
