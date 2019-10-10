import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCroppedComponent } from './image-cropped.component';

describe('ImageCroppedComponent', () => {
  let component: ImageCroppedComponent;
  let fixture: ComponentFixture<ImageCroppedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCroppedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCroppedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
