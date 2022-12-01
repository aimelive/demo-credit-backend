# Demo Credit Backend

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

### Features

* A user can create an account
* A user can fund their account
* A user can transfer funds to another user’s account
* A user can withdraw funds from their account
* A user can view transactions made on his/her account.
### API Deployment & Documentation
#### App URL
```bash
https://aime-ndayambaje-lendsqr-be-test.up.railway.app
```
#### Run Postman
N.B: Set an active environment before sending request, we'll set {{token}} variable after logging in or sign up.
```bash
https://www.postman.com/aimelive/workspace/apps/request/19816222-f4e7ac50-a669-4ab7-b30a-318804cf9e86
```
### Running locally
* [x] Clone this repository
```bash
https://github.com/aimelive/lendsqr-be-test
```
* [x] cd into project root directory
* [x] Create `.env` file and put variables as listed in `.env.example` file
* [x] Run command `npm install` to get all dependencies into project
* [x] Run command `npm run migrate && npm run seed` to create knex_migrations and seeds for you in your database
* [x] Run command `npm run dev` to launch the project on specified `PORT` in development mode
##### Test
*  Run command `npm test` to run unit tests
##### Build and Run
*  Run command `npm start` to build and run application

### Prerequisites
* [x] You should have NodeJs installed on your machine, TypeScript, MySQL running DB or any other SQL DB
* [x] Tools like Postman or Thunderclient are needed to test API routes

### API Endpoints

| HTTP Request Method | Endpoints | Describe |
| --- | --- | --- |
| POST | /api/v1/users/register | Create new user and account |
| POST | /api/v1/users/login | Sign in user account |
| GET | /api/v1/users/ | Get all users accounts |
| GET | /api/v1/account/details | View account details like balance, id, currency,.. |
| POST | /api/v1/account/deposit | Deposit money to user's account |
| POST | /api/v1/account/withdraw | Withdraw  money from user's acount |
| POST | /api/v1/account/transfer/:to_account | Transfer money from user's account to another account |
| GET | /api/v1/transactions/ | Get all transactions made on user's account like deposit, withdraw or transfer |
| GET | /api/v1/transactions/:id | Get one specific transaction |

### DB ERD
```bash
  https://drawsql.app/teams/aime-ndayambajes-team-1/diagrams/demo-credit-2
```
<img width="1161" alt="Screen Shot 2022-12-01 at 19 58 07" src="https://user-images.githubusercontent.com/98814433/205145245-7c6b5b64-2872-4811-bbe2-0fafd0e2977a.png">

### Technologies Used

* Node JS 
* TypeScript 
* Knex JS (ORM)
* MySQL (Database)

### Author
* [Aime Ndayambaje](https://github.com/aimelive)
