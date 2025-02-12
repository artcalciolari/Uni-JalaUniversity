import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" (click)="onSelect()">
      <h3>{{ title }}</h3>
      <p>State: {{ state }}</p>
      <!-- The Content will be put here via component injection -->
      <ng-content></ng-content>
      <button (click)="onRemove($event)">Remove</button>
      <button (click)="onChangeState($event)">Change State</button>
    </div>
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() state: 'New' | 'Pending' | 'Done' | 'Blocked' = 'New';
  @Output() remove = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();
  @Output() changeState = new EventEmitter<void>();

  onRemove(event: Event): void {
    // Prevent the click event from bubbling up to the card
    event?.stopPropagation();
    this.remove.emit();
  }

  onSelect(): void {
    this.select.emit();
  }

  onChangeState(event: Event): void {
    event.stopPropagation();
    this.changeState.emit();
  }
}
