import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import * as CounterActions from '../store/counter/counter.actions';
import { selectCount } from '../store/counter/counter.selectors';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  count$: Observable<number>;
  inputValue: number = 0;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
  }

  increment(): void {
    this.store.dispatch(CounterActions.increment());
  }

  decrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  reset(): void {
    this.store.dispatch(CounterActions.reset());
  }

  setValue(): void {
    this.store.dispatch(CounterActions.setValue({ value: this.inputValue }));
  }
}
