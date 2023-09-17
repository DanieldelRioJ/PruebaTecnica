import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appUnsubscribe]',
  standalone: true
})
export class UnsubscribeDirective implements OnDestroy {
  protected readonly _unsubscribe$ = new Subject<void>();
  constructor() {}

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
