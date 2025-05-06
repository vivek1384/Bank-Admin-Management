import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { Approved } from '../app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approved',
  imports: [RouterLink, FormsModule],
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.css',
})
export class ApprovedComponent implements OnInit{
  router = inject(Router);
  service = inject(UserService);

  searchText = '';

  appLoan: Approved = new Approved();
  appLoanList: Approved[] = [];

  logout() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.router.navigate(['login']);
    }
  }

  onChange(){
  }

  ngOnInit(): void {
      this.getApploanList()
  }

  getApploanList(){
    this.service.getApploanList().subscribe((res)=>{
      this.appLoanList = res;
    })
  }
}
