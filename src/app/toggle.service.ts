import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ToggleService {

  constructor() { }

  private showDetailsSubject = new BehaviorSubject(false);
  showDetailsState = this.showDetailsSubject.asObservable();

  changeShowDetailsState(showDetails: boolean) {
    this.showDetailsSubject.next(showDetails);
  }

}
