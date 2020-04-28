import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Course} from '../model/course.model';
import {catchError, delay, map, shareReplay, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessagesService} from '../messges/messages.service';
import {LoadingService} from '../loading/loading.service';

@Injectable({
  providedIn:'root'
})
export class CourseStore {

  private subject:BehaviorSubject<Course[]>=new BehaviorSubject<Course[]>([]);

  courses$:Observable<Course[]>=this.subject.asObservable();


  constructor(private http:HttpClient,private messages:MessagesService,private loading:LoadingService) {
    this.reloadAllCourses();
  }

  private reloadAllCourses() {
    const loadingCourses$=this.http.get<Course[]>('http://localhost:8080/api/courses').pipe(
      delay(1500),
      shareReplay(),
      catchError(err=>{
        const messages='Could Not Load All Courses';
        this.messages.showErrorMessages(messages);
        return throwError(err);
      }),
      tap(courses => this.subject.next(courses))
    );
    this.loading.showLoaderUntilCompleted(loadingCourses$).subscribe();
  }

  filterByCategory(category:string):Observable<Course[]>{
    return this.courses$.pipe(
      tap(()=> this.loading.loadingOn()),
      delay(1500),
      map(courses => courses.filter( course => course.category == category)),
      tap(()=> this.loading.loadingOff())
    );
  }
  //Optimistic Data Modification Pattern
  saveCourse(courseId:number,changes:Partial<Course>):Observable<Course>{
    const courses = this.subject.getValue();
    const index = courses.findIndex(course => course.id == courseId); //find index to update the course

    const newCourse:Course={
      ...courses[index],
      ...changes
    }   //update data to course

    const newCourses:Course[]=courses.slice(0);

    newCourses[index]=newCourse;

    this.subject.next(newCourses);


    ////API Update
    const header=new HttpHeaders().set('Content-type','application/json');
    return this.http.patch<Course>(`http://localhost:8080/api/courses/${courseId}`,changes,{headers:header})
      .pipe(
        shareReplay(),
        catchError(err => {
          const message='Could not update Course';
          this.messages.showErrorMessages(message);
          return throwError(err);
        })
      )


  }


}
