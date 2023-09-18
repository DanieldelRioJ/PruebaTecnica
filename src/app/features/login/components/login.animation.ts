import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const loginAnimation = trigger('visibleHidden', [
  state(
    'visible',
    style({
      opacity: 1
    })
  ),
  state(
    'hidden',
    style({
      opacity: 0
    })
  ),
  transition('visible <=> hidden', [animate('0.5s')])
]);
