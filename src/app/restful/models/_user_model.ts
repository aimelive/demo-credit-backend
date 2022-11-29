export class User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  password: string;
  account_id: string;
  created_at: Date;
  updated_at: Date;
  constructor(
    id: number,
    fullname: string,
    username: string,
    email: string,
    password: string,
    account_id: string,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.account_id = account_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
