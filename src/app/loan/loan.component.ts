import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { Approved, Loan, User } from '../app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan',
  imports: [RouterLink, FormsModule],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css',
})
export class LoanComponent implements OnInit {
  ngOnInit(): void {
    this.user.amount = 0;
    this.getLoanlist();
  }
  router = inject(Router);
  service = inject(UserService);

  loan: Loan = new Loan();
  loanList: Loan[] = [];

  approved: Approved = new Approved();

  addLoan(data: Loan) {
    if (
      this.loan.ammount &&
      this.loan.name &&
      this.loan.repayment &&
      this.loan.rofi &&
      this.loan.fees
    ) {
      this.service.addLoan(data).subscribe((res) => {
        if (res) {
          alert('Loan added.');
          this.loan = new Loan();
        }
      });
    } else if (
      !this.loan.ammount ||
      !this.loan.name ||
      !this.loan.repayment ||
      !this.loan.rofi ||
      !this.loan.fees
    ) {
      alert('Please fill all the feild first.');
    }
  }
  updateLoan(data: Loan) {
    this.service.updateLoan(data.id, data).subscribe((res) => {
      if (res) {
        alert('Loan Updated.');
        this.loan = new Loan();
        this.isEdit = false;
      }
    });
  }
  getLoanlist() {
    this.service.getLoanlist().subscribe((res) => {
      if (res) {
        this.loanList = res;
      }
    });
  }
  deleteLoan(i: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.service.deleteLoan(i).subscribe((res) => {
        if (res) {
          this.getLoanlist();
        }
      });
    }
  }
  proceed(data: Loan) {
    if (this.user.id) {
      this.isTrue = false;
      this.loan = data;
      this.approved.accNo = this.user.accNo;
      this.approved.name = this.user.fName + ' ' + this.user.lName;
      this.approved.mono = this.user.phNumber;
      this.approved.mail = this.user.mail;
      this.approved.rofi = data.rofi + '%';
      this.approved.loan = data.name;
    }
  }
  isChange = true
  onCredit(){
    this.isChange = true
  }
  check(data: any) {
    if (!data) {
      alert('Please enter credit score.');
    } else {
      data = data * 1;
      if (300 < data * 1 && 900 > data * 1) {
        if (600 < data) {
          let percentage = ((data - 300) * 100) / 600;
          console.log(percentage);
          // debugger;
          let amountTotal: any = this.loan.ammount;
          let monthTotal2: any = this.loan.repayment2;
          let monthTotal1: any = this.loan.repayment;
          let monthTotal = monthTotal2 - monthTotal1;
          let rofi: any = this.loan.rofi;
          rofi = rofi / 2
          this.approved.amount = Math.floor((amountTotal * percentage) / 100);
          debugger;
          this.approved.repayment = Math.floor(
            monthTotal1 * 1 + (monthTotal * percentage) / 100
          );
          setTimeout(() => {
            // debugger
            let p = amountTotal;
            let r = rofi / 12 / 100;
            let n = this.approved.repayment;
            // debugger
            const numerator = p * r * Math.pow(1 + r, n);
            const denominator = Math.pow(1 + r, n) - 1;
            // debugger
            if (denominator === 0) {
              console.log('Not computed.');
            } else {
              const emi: any = numerator / denominator;
              this.approved.monthly = emi.toFixed(0) * 1 + 1;
              this.isChange = false
            }
          }, 0);
        } else {
          alert("Your Credit Score is too low to get loan.")
        }
      } else {
        alert('Entered Credit score is not between 300 and 900.');
        this.approved.cScore = '';
      }
    }
  }

  submit(data:Approved){
    if(!this.isChange){
      data.totalEmidone = 0
      this.service.addApproved(data).subscribe((res)=>{
        if(res){
          alert("Loan Submitted.")
          this.isShow = false;
          this.isTrue = true;
          this.user = new User()
          this.loan = new Loan()
          this.approved = new Approved()
          this.accNO = ''
        }
      })
      
    }else{
      alert("Not submitted.")
    }
  }

  isEdit = false;
  edit(data: Loan) {
    this.isEdit = true;
    this.loan = data;
  }

  isTrue = true;

  accNO = '';
  onChange() {
    if (!this.accNO) {
      this.user = new User();
    } else {
      this.service.getuserbyaccNo(this.accNO).subscribe((res) => {
        if (res.length == 1) {
          this.isShow = true;
          this.user = res[0];
          this.accNO = this.user.fName + ' ' + this.user.lName;
        } else {
          alert('Wrong Account Number.');
        }
      });
    }
  }

  isShow = false;
  user: User = new User();

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.router.navigate(['login']);
    }
  }
}
