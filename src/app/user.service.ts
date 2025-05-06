import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Approved, EMI, Entry, Loan, User } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)


  addUser(data:User){
    return this.http.post('http://localhost:3000/user', data)
  }
  addDepEntry(data:Entry){
    return this.http.post("http://localhost:3000/entry", data)
  }
  getUserList(){
    return this.http.get<User[]>("http://localhost:3000/user")
  }
  getuserbyaccNo(accNo:string){
    return this.http.get<User[]>("http://localhost:3000/user?accNo="+accNo)
  }
  addAmount(id:string, data:User){
    return this.http.put("http://localhost:3000/user/"+id, data)
  }
  getTransactionList(){
    return this.http.get<Entry[]>("http://localhost:3000/entry")
  }
  deleteTransaction(id:any){
    return this.http.delete("http://localhost:3000/entry/"+id)
  }
  delete(id:any){
    return this.http.delete("http://localhost:3000/user/"+id)
  }
  deleteEnries(accNo:any){
    this.http.get<Entry[]>("http://localhost:3000/entry?accNo="+accNo).subscribe((res)=>{
      if(res){
        for (let index = 0; index < res.length; index++) {
          this.http.delete("http://localhost:3000/entry/"+res[index].id).subscribe((Res)=>{
            if(Res){
              console.log("Delete Entry.")
            }
          })
          
        }
      }
    })
  }
  addLoan(data:Loan){
    return this.http.post("http://localhost:3000/loan", data)
  }
  getLoanlist(){
    return this.http.get<Loan[]>("http://localhost:3000/loan")
  }
  updateLoan(id:any, data:Loan){
    return this.http.put("http://localhost:3000/loan/"+id, data)
  }
  deleteLoan(i:any){
    return this.http.delete("http://localhost:3000/loan/"+i)
  }
  addApproved(data:Approved){
    return this.http.post("http://localhost:3000/approved", data)
  }
  getLoanbyacc(no:any){
    return this.http.get<Approved[]>("http://localhost:3000/approved?accNo="+no)
  }
  addEMIpayment(data:EMI){
    return this.http.post("http://localhost:3000/emiPayment", data)
  }
  editApproved(data:Approved){
    return this.http.put("http://localhost:3000/approved/"+data.id, data)
  }
  getApploanList(){
    return this.http.get<Approved[]>("http://localhost:3000/approved")
  }
  deleteApprovebyAcc(no:any){
    this.http.get<Approved[]>("http://localhost:3000/approved?accNo="+no).subscribe((res)=>{
      if(res){
        for (let index = 0; index < res.length; index++) {
          this.http.delete("http://localhost:3000/approved/"+res[index].id).subscribe((Res)=>{
            if(Res){
              console.log("Delete Loan.")
            }
          })
          
        }
      }
    })
  }
  deleteEMIbyacc(n:any){
    this.http.get<EMI[]>("http://localhost:3000/emiPayment?accNo="+n).subscribe((res)=>{
      if(res){
        for (let index = 0; index < res.length; index++) {
          this.http.delete("http://localhost:3000/emiPayment/"+res[index].id).subscribe((Res)=>{
            if(Res){
              console.log("Delete EMI.")
            }
          })          
        }
      }
    })
  }

  constructor() { }
}
