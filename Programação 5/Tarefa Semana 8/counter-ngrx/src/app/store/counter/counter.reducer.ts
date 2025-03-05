import { createReducer, on } from '@ngrx/store';
import { CounterState, initialState } from './counter.state';
import * as CounterActions from './counter.actions';

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1,
  })),
  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1,
  })),
  on(CounterActions.reset, (state) => ({ ...state, count: 0 })),
  on(CounterActions.setValue, (state, { value }) => ({
    ...state,
    count: value,
  }))
);
