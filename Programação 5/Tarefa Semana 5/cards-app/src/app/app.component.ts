import { Component, OnInit } from '@angular/core';
import { Card } from './card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Cards in memory
  inMemoryCards: Card[] = [
    {
      id: 1,
      title: 'Default Card',
      content: 'Card 1 in memory',
    },
    {
      id: 2,
      title: 'Default Card',
      content: 'Card 2 in memory',
    },
  ];

  cardForm = { title: '', content: '' };
  editing = false;
  editingCard: Card | null = null;
  editingSource: 'memory' | null = null;

  // To generate unique IDs for in-memory cards
  nextMemoryId = 3;

  onSubmit(): void {
    if (this.editing && this.editingCard) {
      // Updates existing card
      const updatedCard: Card = {
        ...this.editingCard,
        title: this.cardForm.title,
        content: this.cardForm.content,
      };
      if (this.editingSource === 'memory') {
        const index = this.inMemoryCards.findIndex(
          (card) => card.id === updatedCard.id
        );
        if (index > -1) {
          this.inMemoryCards[index] = updatedCard;
        }
      }
      this.resetForm();
    } else {
      // Adds new card
      const newCard: Card = {
        title: this.cardForm.title,
        content: this.cardForm.content,
      };

      // Adds to in memory array
      newCard.id = this.nextMemoryId++;
      this.inMemoryCards.push(newCard);
      this.resetForm();
    }
  }

  // Use the data from the card to populate the form
  onSelectCard(card: Card, source: 'memory'): void {
    this.editing = true;
    this.editingCard = card;
    this.editingSource = source;
    this.cardForm.title = card.title;
    this.cardForm.content = card.content;
  }

  // Removes the card from the list
  onRemoveCard(card: Card, source: 'memory' | 'server'): void {
    if (source === 'memory') {
      this.inMemoryCards = this.inMemoryCards.filter((c) => c.id !== card.id);
    }
    // If the card being edited is removed, reset the form
    if (this.editingCard && this.editingCard.id === card.id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.cardForm = { title: '', content: '' };
    this.editing = false;
    this.editingCard = null;
    this.editingSource = null;
  }
}
