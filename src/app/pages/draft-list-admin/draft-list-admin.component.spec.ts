import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftListAdminComponent } from './draft-list-admin.component';

describe('DraftListAdminComponent', () => {
  let component: DraftListAdminComponent;
  let fixture: ComponentFixture<DraftListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
