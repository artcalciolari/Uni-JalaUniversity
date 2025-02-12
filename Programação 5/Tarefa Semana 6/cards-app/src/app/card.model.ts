export interface Card {
  id?: number;
  title: string;
  content: string;
  state: 'New' | 'Pending' | 'Done' | 'Blocked';
}
