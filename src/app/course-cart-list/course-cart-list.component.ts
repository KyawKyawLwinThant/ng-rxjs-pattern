import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../model/course.model';

@Component({
  selector: 'app-course-cart-list',
  templateUrl: './course-cart-list.component.html',
  styleUrls: ['./course-cart-list.component.css']
})
export class CourseCartListComponent implements OnInit {

  @Input()
  courses$:Observable<Course[]>;

  constructor() { }

  ngOnInit(): void {
  }




}
