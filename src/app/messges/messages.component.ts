import { Component, OnInit } from '@angular/core';
import {MessagesService} from './messages.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-messges',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  showMessages=false;

  errors$:Observable<string[]>;

  constructor(public messagesService:MessagesService) { }

  ngOnInit(): void {
    this.errors$=this.messagesService.errors$
      .pipe(
        tap(()=> this.showMessages=true)
      )
  }


  onClose(){
    this.showMessages=false;
  }

}
