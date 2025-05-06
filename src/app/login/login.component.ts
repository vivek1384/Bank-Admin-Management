import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = ''
  password = ''
  otp = ''

  router = inject(Router)

  login(m:string, p:string, otp:string){
    if(m == "vivek@gmail.com" && p == "1313" && otp == "1616"){
      this.router.navigate(['home'])
    }else{
      alert("Invalid Credentials")
    }
  }

}
