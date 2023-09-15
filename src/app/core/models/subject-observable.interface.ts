import { Observable } from 'rxjs';

export interface SubjectObservableInterface<T = any> {
  value$: Observable<T>;

  set value(value: T);
}
