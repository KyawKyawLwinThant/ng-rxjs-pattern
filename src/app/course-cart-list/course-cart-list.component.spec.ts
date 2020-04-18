import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCartListComponent } from './course-cart-list.component';

describe('CourseCartListComponent', () => {
  let component: CourseCartListComponent;
  let fixture: ComponentFixture<CourseCartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
