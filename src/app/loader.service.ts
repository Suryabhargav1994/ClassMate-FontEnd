import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: boolean = false;
  stateChange : Subject<boolean> = new Subject<boolean>();

  constructor() { }

  showLoading() {
    this.stateChange.next(true);
  }

  hideLoading() {
    this.stateChange.next(false);
  }
}
