import { Observable, Subject } from 'rxjs';
import { SubjectObservableInterface } from './subject-observable.interface';

export class SubjectObservableUtil<T = any>
  implements SubjectObservableInterface<T>
{
  private _subject: Subject<T>;
  value$: Observable<T>;

  constructor(subject: Subject<T>) {
    this._subject = subject;
    this.value$ = this._subject.asObservable();
  }

  set value(value: T) {
    this._subject.next(value);
  }
}
