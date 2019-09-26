import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesStateCompanyComponent } from './changes-state-company.component';

describe('ChangesStateCompanyComponent', () => {
  let component: ChangesStateCompanyComponent;
  let fixture: ComponentFixture<ChangesStateCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangesStateCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangesStateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
