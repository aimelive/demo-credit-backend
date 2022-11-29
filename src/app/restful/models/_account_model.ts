export class Account {
  account_id: string;
  account_name: string;
  user_id: string;
  constructor(account_id: string, account_name: string, user_id: string) {
    this.account_id = account_id;
    this.account_name = account_name;
    this.user_id = user_id;
  }
}
