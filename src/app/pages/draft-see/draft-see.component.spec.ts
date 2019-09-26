import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSeeComponent } from './draft-see.component';

describe('DraftSeeComponent', () => {
  let component: DraftSeeComponent;
  let fixture: ComponentFixture<DraftSeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftSeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
