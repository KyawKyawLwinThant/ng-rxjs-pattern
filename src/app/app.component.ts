import { Component } from '@angular/core';
import {LoadingService} from './loading/loading.service';
import {MessagesService} from './messges/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    LoadingService,
    MessagesService
  ]
})
export class AppComponent {
  title = 'reactive-pattern';
}
