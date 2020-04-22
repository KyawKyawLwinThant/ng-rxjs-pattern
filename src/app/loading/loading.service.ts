import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';


@Injectable()
export class LoadingService {

  loadingSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  loading$:Observable<boolean>=this.loadingSubject.asObservable();


  loadingOn(){
    this.loadingSubject.next(true);
  }
  loadingOff(){
    this.loadingSubject.next(false);
  }

  showLoaderUntilCompleted<T>(obs$:Observable<T>):Observable<T>{
    return of(null)
      .pipe(
        tap(()=> this.loadingOn()),
        concatMap(()=> obs$),
        finalize(()=> this.loadingOff())
      );
  }

}
