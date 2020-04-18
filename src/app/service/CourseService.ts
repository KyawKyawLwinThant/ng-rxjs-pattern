import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course.model';


@Injectable({
  providedIn:'root'
})
export  class CourseService{

    constructor(private http:HttpClient) {
    }

    loadAllCourses():Observable<Course[]>{
      return this.http.get<Course[]>('http://localhost:8080/api/courses');
    }

    updateCourse(id:number,course:Partial<Course>):Observable<Course>{
      const header=new HttpHeaders().set('Content-type','application/json');
      return this.http.put<Course>(`http://localhost:8080/api/courses/${id}`,course,{headers:header});
    }


}
