import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Entry, User } from '../app.component';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { faDownLong } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-transactions',
  imports: [RouterLink, FormsModule, DatePipe, FontAwesomeModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  router = inject(Router);
  service = inject(UserService)

  ngOnInit(): void {
      this.getTransactionList();
  }
  reload(){
    window.location.reload()
  }

  Up = faUpLong;
  income = 0
  Down = faDownLong;
  outcome = 0


  incomeList : Entry[] = []
  outcomeList : Entry[] = []


  searchText = ''
  searchText2 = ''
  tran : Entry = new Entry()
  tranList : Entry[] = []
  tranList2 : Entry[] = []
  user : User = new User()

  isTrue = false

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.router.navigate(['login']);
    }
  }
  getTransactionList(){
    this.service.getTransactionList().subscribe((res)=>{
      if(res){
        for (let index = 0; index < res.length; index++) {
          this.service.getuserbyaccNo(res[index].accNo).subscribe((Res)=>{
            if(Res){
              res[index].name = Res[0].fName + " " + Res[0].lName
            }
          })
          
        }
        this.tranList = res;
        this.tranList2 = this.tranList;
        this.incomeList = res.filter((item)=>
          item.type == 'Deposite'
        )
        this.outcomeList = res.filter((item)=>
          (item.type == 'Withdrawal' || item.type.includes("EMI")) && item.transaction.includes('success')
        )
        console.log(this.incomeList)
        console.log(this.outcomeList)
        console.log(res.length)
        for (let index = 0; index < this.incomeList.length; index++) {
            this.income = this.income + (this.incomeList[index].amount * 1)
        }
        for (let index = 0; index < this.outcomeList.length; index++) {
            this.outcome = this.outcome + (this.outcomeList[index].amount * 1)
        }
      }
    })
  }

  onChange(){
    if(!this.searchText){
      this.getTransactionList()
    }else{
      this.searchText2 = ''
      this.tranList2 = this.tranList.filter((item)=>
        item.accNo.includes(this.searchText)
      )
    }
  }
  onChange2(){
    if(!this.searchText2){
      this.getTransactionList
    }else{
      this.searchText = ''
      this.tranList2 = this.tranList.filter((item)=>
        item.date.toString().includes(this.searchText2)
    )
    console.log(this.tranList2)
    }
  }
}
