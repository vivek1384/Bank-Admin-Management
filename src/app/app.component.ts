import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'banking';
}

export class User {
  title: string;
  fName: string;
  mName: string;
  lName: string;
  aLine1: string;
  aLine2: string;
  phNumber: string;
  mail: string;
  id: any;
  accNo: string;
  amount: any;
  constructor() {
    this.title = '';
    this.fName = '';
    this.mName = '';
    this.lName = '';
    this.aLine1 = '';
    this.aLine2 = '';
    this.phNumber = '';
    this.mail = '';
    this.id = undefined;
    this.accNo = '';
    this.amount = '500';
  }
}

export class Entry {
  id: any;
  amount: any;
  accNo: string;
  type: string;
  date: Date;
  name: string;
  loanName : string
  transaction : string
  constructor() {
    this.id = undefined;
    this.amount = '';
    this.accNo = '';
    this.type = 'Withdrawal';
    this.date = new Date();
    this.name = '';
    this.loanName = ''
    this.transaction = ''
  }
}

export class Loan {
  id: any;
  name: string;
  rofi: string;
  ammount: string;
  repayment: string;
  repayment2: string;
  fees: string;
  constructor() {
    this.name = '';
    this.rofi = '';
    this.ammount = '';
    this.repayment = '';
    this.repayment2 = '';
    this.fees = '';
    this.id = undefined;
  }
}

export class Approved {
  id:any
  name: string;
  mono: string;
  mail: string;
  loan: string;
  rofi: string;
  cScore: string;
  amount: any;
  repayment: any;
  monthly: any;
  totalEmidone: any;
  accNo : string;
  remainigAmount : any
  constructor() {
    this.name = '';
    this.mono = '';
    this.mail = '';
    this.loan = '';
    this.rofi = '';
    this.cScore = '';
    this.amount = '';
    this.repayment = '';
    this.monthly = '';
    this.totalEmidone = '';
    this.accNo = ''
    this.id = undefined
  }
}

export class EMI {
  id: any;
  loan: Approved;
  amount : any;
  EMInumber : string
  accNo : string
  constructor() {
    this.id = undefined
    this.loan = new Approved();
    this.amount = ''
    this.EMInumber = '' 
    this.accNo = '' 
  }
}
