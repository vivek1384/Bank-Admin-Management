import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Approved, Entry, User } from '../app.component';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [RouterLink, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  totalAmount = 0;
  ngOnInit(): void {
    this.getUserList();
    setTimeout(() => {
      for (let index = 0; index < this.userList.length; index++) {
        this.totalAmount = this.totalAmount + this.userList[index].amount;
      }
    }, 50);
  }

  searchText = '';

  onChange() {
    if (!this.searchText) {
      this.getUserList();
    }
    this.userList2 = this.userList.filter((item) =>
      item.accNo.includes(this.searchText)
    );
  }

  router = inject(Router);
  service = inject(UserService);
  user: User = new User();
  userList: User[] = [];
  userList2: User[] = [];
  accNO = '';
  accName = '';

  isShow = false;

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.router.navigate(['login']);
    }
  }
  getUserList() {
    this.service.getUserList().subscribe((res) => {
      if (res) {
        this.userList = res;
        this.userList2 = this.userList;
      }
    });
  }

  loanList: Approved[] = [];
  remainingLoan: any = '';
  totalLoanAmount: any = 0;
  remainigAmount: any = 0;

  closeAcc(item: User) {
    this.isShow = true;
    this.user = item;
    this.accNO = item.accNo;
    this.accName = item.fName + ' ' + item.lName;
    this.service.getLoanbyacc(item.accNo).subscribe((res) => {
      if (res) {
        this.loanList = res;
        for (let index = 0; index < this.loanList.length; index++) {
          this.loanList[index].remainigAmount =
            (this.loanList[index].repayment -
              this.loanList[index].totalEmidone) *
            this.loanList[index].monthly;
          this.totalLoanAmount =
            this.totalLoanAmount + this.loanList[index].remainigAmount;
          this.remainigAmount = this.totalLoanAmount - item.amount;
        }
      }
    });
  }
  back() {
    this.isShow = false;
    this.totalLoanAmount = 0;
  }
  close2(item: User) {
    if (this.remainigAmount > 0) {
      alert(
        'You have to paid your remainig amount which is : ₹' +
          this.remainigAmount
      );
    } else {
      alert('Your current balance is : ₹' + this.remainigAmount * -1);
    }
    let isDel = confirm(`Are you sure Mr. ${item.fName} ${item.lName}?`);
    if (isDel) {
      this.service.delete(item.id).subscribe((res) => {
        if (res) {
          console.log('Account deleted.');
          this.getUserList();
          this.isShow = false;
          this.service.deleteEnries(item.accNo);
          this.service.deleteApprovebyAcc(item.accNo);
          this.service.deleteEMIbyacc(item.accNo);
        }
      });
    }
  }
}
