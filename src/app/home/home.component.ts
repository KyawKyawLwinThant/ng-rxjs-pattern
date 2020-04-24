import { Component, OnInit } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Course} from '../model/course.model';
import {CourseService} from '../service/CourseService';
import {catchError, finalize, map} from 'rxjs/operators';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messges/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  courses$:Observable<Course[]>;


  constructor(private courseService:CourseService,private loadingService:LoadingService,
              private messagesService:MessagesService) { }

  ngOnInit(): void {
    this.reloadAllCourses();
  }

  private reloadAllCourses() {
    //this.loadingService.loadingOn();
    this.courses$ = this.courseService.loadAllCourses()
      .pipe(
        catchError(err =>{
          const messages='Could Not Load Courses';
          this.messagesService.showErrorMessages(messages);
          return throwError(err)
        })
      )
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
