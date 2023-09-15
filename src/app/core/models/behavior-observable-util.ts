import { BehaviorSubject, Observable } from 'rxjs';
import { SubjectObservableInterface } from './subject-observable.interface';

export class BehaviorObservableUtil<T = any>
  implements SubjectObservableInterface<T>
{
  private _subject: BehaviorSubject<T>;
  value$: Observable<T>;
  constructor(subject: BehaviorSubject<T>) {
    this._subject = subject;
    this.value$ = this._subject.asObservable();
  }

  set value(value: T) {
    this._subject.next(value);
  }

  get value() {
    return this._subject.value;
  }
}
