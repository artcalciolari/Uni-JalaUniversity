import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from './counter/counter.reducer';
import { CounterState } from './counter/counter.state';

export interface AppState {
  counter: CounterState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
};
