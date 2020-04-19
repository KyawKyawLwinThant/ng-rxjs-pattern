import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course.model';
import {shareReplay} from 'rxjs/operators';


@Injectable({
  providedIn:'root'
})
export  class CourseService{

    constructor(private http:HttpClient) {
    }

    loadAllCourses():Observable<Course[]>{
      return this.http.get<Course[]>('http://localhost:8080/api/courses').pipe(
        shareReplay()
      );
    }

    updateCourse(id:number,course:Partial<Course>):Observable<Course>{
      const header=new HttpHeaders().set('Content-type','application/json');
      return this.http.patch<Course>(`http://localhost:8080/api/courses/${id}`,course,{headers:header})
        .pipe(
          shareReplay()
        )

    }


}
