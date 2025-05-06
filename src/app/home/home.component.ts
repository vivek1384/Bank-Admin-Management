import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Approved, EMI, Entry, Loan, User } from '../app.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  service = inject(UserService);
  entryList: Entry[] = [];

  getEntryList() {
    this.service.getTransactionList().subscribe((res) => {
      if (res) {
        this.entryList = res;
      }
    });
  }

  ngOnInit(): void {
    this.getEntryList();
  }

  isUserinfo = true;
  user: User = new User();
  user2: User = new User();

  accNO = '';
  remainingEMI: any = '';

  isRepaymentValid = false;

  check() {
    if (!this.accNO) {
      alert('Enter valid account number.');
    } else {
      this.service.getLoanbyacc(this.accNO).subscribe((res) => {
        if (res.length == 0) {
          alert('No loans found with this account number.');
          this.accNO = '';
        } else {
          this.loanList = res;
          this.accNO = this.loanList[0].name;
        }
      });
    }
  }
  onLoan(data: Approved) {
    this.emi.loan = data;
    this.emi.amount = data.monthly;
    this.emi.accNo = data.accNo;
    this.remainingEMI = data.repayment - data.totalEmidone;
    this.emi.EMInumber = (this.emi.loan.totalEmidone * 1 + 1).toString();
    this.isRepaymentValid = true;
  }
  repayment(data: EMI) {
    if (this.isRepaymentValid) {
      this.service.addEMIpayment(data).subscribe((res) => {
        if (res) {
          this.entry2.accNo = data.accNo;
          this.entry2.amount = data.amount;
          this.entry2.date = new Date();
          this.entry2.name = data.loan.name;
          this.entry2.type = `EMI ${data.EMInumber}`;
          this.entry2.loanName = data.loan.loan;
          this.withdrawal(this.entry2);
          setTimeout(() => {
            if (this.isComplete) {
              if (this.isWithdrawal) {
                data.loan.totalEmidone = data.EMInumber;
                this.service.editApproved(data.loan).subscribe((res) => {
                  if (res) {
                    console.log('hello');
                    this.emi = new EMI();
                    this.accNO = '';
                    this.remainingEMI = '';
                    this.loanList = [];
                    this.isComplete = false;
                    this.isWithdrawal = false;
                    this.isRepaymentValid = false;
                  }
                });
              }
            } else {
              console.log('hello');
            }
          }, 8000);
        }
      });
    } else {
      alert('Fill all the feild first.');
    }
  }
  emi: EMI = new EMI();
  loanList: Approved[] = [];

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.router.navigate(['login']);
    }
  }

  entry: Entry = new Entry();
  entry2: Entry = new Entry();

  deposite(data: Entry) {
    data.transaction = 'success'
    let pin = prompt('Enter pin : ', '');
    if (pin == '1616') {
      let isDel = confirm(
        `Are you sure want to deposite ₹${data.amount} to the Acc. No.: ${data.accNo}`
      );
      if (isDel) {
        data.type = 'Deposite';
        this.service.addDepEntry(data).subscribe((res) => {
          if (res) {
            this.service.getuserbyaccNo(data.accNo).subscribe((Res) => {
              if (Res) {
                this.user2 = Res[0];
                // console.log(this.user2)
                // console.log(this.user2.amount)
                this.user2.amount = this.user2.amount * 1 + data.amount * 1;
                this.service
                  .addAmount(this.user2.id, this.user2)
                  .subscribe((res) => {
                    if (res) {
                      alert(`Your current balance is : ₹${this.user2.amount}`);
                      this.entry = new Entry();
                    }
                  });
              }
            });
          }
        });
      }
    } else {
      alert('Wrong pin');
      this.entry = new Entry();
    }
  }
  isComplete = false;
  isWithdrawal = false;
  withdrawal(data: Entry) {
    this.service.getuserbyaccNo(data.accNo).subscribe((res)=>{
      // debugger
      if(res){
        if((res[0].amount - data.amount)>500){
            data.transaction = 'success'
        }
        else{
          data.transaction = 'failed'
        }
      }
    })
    setTimeout(() => {
      let pin = prompt('Enter pin : ', '');
      if (pin == '1616') {
        let isDel = confirm(
          `Are you sure want to withdrawal ₹${data.amount} to the Acc. No.: ${data.accNo}`
        );
        if (isDel) {
          console.log(data)
          // debugger
          this.service.addDepEntry(data).subscribe((res) => {
            if (res) {
              this.service.getuserbyaccNo(data.accNo).subscribe((Res) => {
                if (Res) {
                  this.user2 = Res[0];
                  // console.log(this.user2)
                  // console.log(this.user2.amount)
                  this.user2.amount = this.user2.amount * 1 - data.amount * 1;
                  if (this.user2.amount >= 500) {
                    this.service
                      .addAmount(this.user2.id, this.user2)
                      .subscribe((res) => {
                        if (res) {
                          this.isComplete = true;
                          this.entry2 = new Entry();
                          this.isWithdrawal = true;
                          console.log(this.isComplete);
                          this.getEntryList();
                          alert(
                            `Your current balance is : ₹${this.user2.amount}`
                          );
                        }
                      });
                  } else {
                    alert(
                      `Insufficent Balance, Your account balance is ₹${
                        this.user2.amount * 1 + data.amount * 1
                      }. Minimum balance required is : ₹500.`
                    );
                    this.isWithdrawal = false;
                    this.entry2 = new Entry();
                  }
                }
              });
            }
          });
        }
      } else {
        alert('Wrong Pin.');
        this.entry2 = new Entry();
      }
    }, 500);
  }

  addUser() {
    if (
      !this.user.title ||
      !this.user.fName ||
      !this.user.mName ||
      !this.user.lName ||
      !this.user.aLine1 ||
      !this.user.aLine2 ||
      !this.user.phNumber ||
      !this.user.mail
    ) {
      alert('Please fill all the feild first.');
    } else if (
      this.user.title &&
      this.user.fName &&
      this.user.mName &&
      this.user.lName &&
      this.user.aLine1 &&
      this.user.aLine2 &&
      this.user.phNumber &&
      this.user.mail
    ) {
      this.isUserinfo = false;
    }
  }
  back() {
    this.isUserinfo = true;
  }
  confirm() {
    let number = Math.random() * 10000000000;
    this.user.accNo = Math.floor(number).toString();
    this.service.addUser(this.user).subscribe((res) => {
      if (res) {
        alert('User added successfully!');
        this.user = new User();
        this.isUserinfo = true;
      }
    });
  }
}
