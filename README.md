# 🏦 Bank Admin Management System

A web-based admin panel built with **Angular 19** for internal bank staff to manage user accounts, perform transactions, and handle loan processing. It uses **JSON Server** as a mock backend.

To start exploring app use **Email : vivek@gmail.com**, **Password : 1313** and **OTP : 1616**.
And also every time you made a transaction it will ask for pin use **1616** to procced further.

---

## 🚀 Features

### 👤 User Account Management
- Create user accounts via form.
- Auto-generate unique account numbers.
- View/search all users by account number.
- View account balances.

### 💰 Transaction Management
- Deposit and withdraw money by account number.
- Track all transactions with filters:
  - Transaction ID
  - Date
  - Type (Deposit, Withdrawal, EMI)

### 💳 Loan Management
- Assign loans based on user’s CBIL score.
- Generate loan number, assign amount and EMI structure.
- Pay EMIs and track:
  - Paid EMIs
  - Remaining EMIs
- View all **approved loans**.
- Admin can manage loan types:
  - Add new loan types (interest, max amount, repayment time)
  - Edit/delete existing loan types

---

## ⚙️ Tech Stack

- **Frontend**: Angular
- **Backend**: JSON Server (Mock API)

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/bank-admin-management.git
cd bank-admin-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install JSON Server

```bash
npm install -g json-server
```

### 4. Run JSON Server

Make sure your `db.json` (mock data) is placed in the root directory.

```bash
json-server --watch db.json
```

> The mock API will run at: `http://localhost:3000`

### 5. Run Angular App

Before it split your terminal

```bash
ng serve
```

> Open your browser at: `http://localhost:4200`

---

## 📁 Folder Structure Highlights

```
src/
  ├── app/
  │   ├── components/
  │   ├── services/
  │   ├── models/
  │   └── ...
  ├── assets/
  └── environments/
```

---

## 📌 Author

**Vivek Dudhatra**  
[GitHub](https://github.com/vivek1384)

---

## 📝 License

This project is for educational/demo purposes only. Not intended for production use.
