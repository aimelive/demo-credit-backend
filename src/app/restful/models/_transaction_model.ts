export class Transaction {
  action: string;
  amount: number;
  from: string;
  to: string;
  constructor(action: string, amount: number, from: string, to: string) {
    this.action = action;
    this.amount = amount;
    this.from = from;
    this.to = to;
  }
}
