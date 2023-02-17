# Demo Credit Backend

Demo Credit is a lending app that includes wallet functionality. This is used as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

### Features

- A user can create an account
- A user can fund their account
- A user can transfer funds to another user’s account
- A user can withdraw funds from their account
- A user can view transactions made on his/her account.

### API Deployment & Documentation

#### App URL

```bash
https://demo-credit.up.railway.app/
```

#### Swagger Documentation

```bash
https://demo-credit.up.railway.app/api/v1/docs
```

### Running locally

- [x] Clone this repository

```bash
https://github.com/aimelive/demo-credit-backend.git
```

- [x] cd into project root directory
- [x] Create `.env` file and put variables as listed in `.env.example` file
- [x] Run command `npm install` to get all dependencies into project
- [x] Run command `npm run migrate && npm run seed` to create knex_migrations and seeds for you in your database
- [x] Run command `npm run dev` to launch the project on specified `PORT` in development mode

##### Test

- Run command `npm test` to run unit tests

##### Build and Run

- Run command `npm start` to build and run application

### Prerequisites

- [x] You should have NodeJs installed on your machine, TypeScript, MySQL running DB if you're not using Docker
- [x] Tools like Postman or Thunderclient are needed to test API routes

### Using Docker

- Clone this repository and navigate to the project root directory
- Create `.env` file in the project root directory, fill out all variables basing on the ones specified in `.env.example` file (Check the issues page for reference).
- Next is to make sure that Docker is started and run this command in your terminal

```bash
docker-compose up --build
```
- Run the following command to create migrations and seeds

```bash
npm run migrate && npm run seed
```



- Here you go, you can now run this application via containers exposed to your machine port specified in ${PORT} variable from `.env` file

### API Endpoints

| HTTP Request Method | Endpoints                            | Describe                                                                       |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| POST                | /api/v1/users/register               | Create new user and account                                                    |
| POST                | /api/v1/users/login                  | Sign in user account                                                           |
| GET                 | /api/v1/users/                       | Get all users accounts                                                         |
| GET                 | /api/v1/account/details              | View account details like balance, id, currency,..                             |
| POST                | /api/v1/account/deposit              | Deposit money to user's account                                                |
| POST                | /api/v1/account/withdraw             | Withdraw money from user's acount                                              |
| POST                | /api/v1/account/transfer/:to_account | Transfer money from user's account to another account                          |
| GET                 | /api/v1/transactions/                | Get all transactions made on user's account like deposit, withdraw or transfer |
| GET                 | /api/v1/transactions/:id             | Get one specific transaction                                                   |

### DB ERD

```bash
  https://drawsql.app/teams/aime-ndayambajes-team-1/diagrams/demo-credit-2
```

<img width="1161" alt="Screen Shot 2022-12-01 at 19 58 07" src="https://user-images.githubusercontent.com/98814433/205145245-7c6b5b64-2872-4811-bbe2-0fafd0e2977a.png">

### Technologies Used

- Node JS
- TypeScript
- Knex JS (ORM)
- MySQL (Database)

### Author

- [Aime Ndayambaje](https://github.com/aimelive)
