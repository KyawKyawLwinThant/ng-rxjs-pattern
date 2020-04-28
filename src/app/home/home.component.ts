import { Component, OnInit } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Course} from '../model/course.model';
import {CourseService} from '../service/CourseService';
import {catchError, finalize, map} from 'rxjs/operators';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messges/messages.service';
import {CourseStore} from '../service/course.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  courses$:Observable<Course[]>;


  constructor(private courseService:CourseService,private loadingService:LoadingService,
              private messagesService:MessagesService,private courseStore:CourseStore) { }

  ngOnInit(): void {
    this.reloadAllCourses();
  }

  private reloadAllCourses() {
    this.courses$=this.courseStore.courses$;

  }

  beginnerCourse(){
      this.courses$= this.courseStore.filterByCategory('BEGINNER');
  }

  advancedCourse(){
      this.courses$= this.courseStore.filterByCategory('ADVANCED');
  }


  saveAllChanges(course:Course){
    this.courseStore.saveCourse(course.id,course)
      .subscribe();
  }

}
