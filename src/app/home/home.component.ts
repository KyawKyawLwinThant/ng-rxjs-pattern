import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../model/course.model';
import {CourseService} from '../service/CourseService';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$:Observable<Course[]>;

  beginner$:Observable<Course[]>;

  advanced$:Observable<Course[]>;

  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.reloadAllCourses();
  }

  private reloadAllCourses() {
    const courses$ = this.courseService.loadAllCourses();

    this.beginner$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER'))
    );

    this.advanced$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == 'ADVANCED'))
    );
  }

  beginnerCourse(){
    this.courses$=this.beginner$;
  }

  advancedCourse(){
    this.courses$=this.advanced$;
  }

}
