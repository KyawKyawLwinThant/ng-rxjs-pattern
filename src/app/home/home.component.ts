import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../model/course.model';
import {CourseService} from '../service/CourseService';
import {finalize, map} from 'rxjs/operators';
import {LoadingService} from '../loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  courses$:Observable<Course[]>;


  constructor(private courseService:CourseService,private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.reloadAllCourses();
  }

  private reloadAllCourses() {
    //this.loadingService.loadingOn();
    this.courses$ = this.courseService.loadAllCourses();
    this.courses$=this.loadingService.showLoaderUntilCompleted(this.courses$)

  }

  beginnerCourse(){
   // this.loadingService.loadingOn();
    const courses$ = this.courseService.loadAllCourses();
    const loading$=this.loadingService.showLoaderUntilCompleted(courses$);
    this.courses$ = loading$.pipe(
      map(courses => courses.filter(course => course.category == 'BEGINNER')),
     // finalize(()=> this.loadingService.loadingOff())
    );

  }

  advancedCourse(){
   // this.loadingService.loadingOn();
    const courses$ = this.courseService.loadAllCourses();
    const loading$=this.loadingService.showLoaderUntilCompleted(courses$);
    this.courses$ = loading$.pipe(
      map(courses => courses.filter(course => course.category == 'ADVANCED')),
    //  finalize(()=>this.loadingService.loadingOff())
    );

  }


  saveAllChanges(course:Course){
    this.courseService.updateCourse(course.id,course)
      .subscribe(
        data => console.log('From Home',data),
        error => console.log(error),
        () => this.reloadAllCourses()
      )
  }

}
