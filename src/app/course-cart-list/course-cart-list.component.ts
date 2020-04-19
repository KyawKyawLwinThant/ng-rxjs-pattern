import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../model/course.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-course-cart-list',
  templateUrl: './course-cart-list.component.html',
  styleUrls: ['./course-cart-list.component.css']
})
export class CourseCartListComponent implements OnInit {

  @Input()
  courses$:Observable<Course[]>;

  @Output()
  course:EventEmitter<Course>=new EventEmitter<Course>();


  courseForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.courseForm=this.fb.group(
      {
          url:[''],
        category:[''],
        longDescription:['']
      }
    )
  }


  eidt(course:Course){
    //console.log(course.url);
    this.id=course.id;
    this.courseForm=this.fb.group(
      {
        url:[course.url],
        category:[course.category],
        longDescription:[course.longDescription]
      }
    )
  }

  id:number;


  saveAllChanges(){
    const course:Course=this.courseForm.value;
    course.id=this.id;

    this.course.emit(course);
  }




}
