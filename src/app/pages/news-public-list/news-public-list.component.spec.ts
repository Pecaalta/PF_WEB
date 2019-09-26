import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPublicListComponent } from './news-public-list.component';

describe('NewsPublicListComponent', () => {
  let component: NewsPublicListComponent;
  let fixture: ComponentFixture<NewsPublicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPublicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPublicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
