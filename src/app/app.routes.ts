import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LoanComponent } from './loan/loan.component';
import { ApprovedComponent } from './approved/approved.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'login',
        pathMatch : 'full'
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path: 'home',
        component : HomeComponent
    }
    ,
    {
        path: 'user',
        component : UserComponent
    }
    ,
    {
        path: 'transaction',
        component : TransactionsComponent
    }
    ,
    {
        path: 'loan',
        component : LoanComponent
    }
    ,
    {
        path: 'approved-loan',
        component : ApprovedComponent
    }
];
