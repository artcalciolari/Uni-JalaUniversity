import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as CounterActions from './counter.actions';

@Injectable()
export class CounterEffects {
  logActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CounterActions.increment,
          CounterActions.decrement,
          CounterActions.reset,
          CounterActions.setValue
        ),
        tap((action) => console.log('Ação Despachada:', action))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
