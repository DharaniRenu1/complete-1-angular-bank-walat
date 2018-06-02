import { StockproductComponent } from './fdownersettlement/stockproduct.component';
import { UpdateproductComponent } from './loanrequest/updateproduct.component';
import { ProductComponent } from './Register/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewcusOrderComponent } from './fduserrequest/viewcus-order.component';
import { WithdrawComponent } from './bankprocess/withdraw.component';
import { FixeddepositComponent } from './fixeddeposit/fixeddeposit.component';
import { LoanpayComponent } from './loanpay/loanpay.component';
import { LendingdetailComponent } from './lendingdetail/lendingdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { MetamaskErrorComponent } from './metamask-error/metamask-error.component';


import { AuthGuardGuard } from './auth-guard.guard';
import { BankguardGuard } from './bankguard.guard';





const routes: Routes = [

  {
    path: 'register',
    component: ProductComponent,
    canActivate:[AuthGuardGuard],
  },
  {
    path: 'metamask',
    component:MetamaskErrorComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[BankguardGuard],
    children:[
  
  {
    path: 'loanrequest',
    component: UpdateproductComponent
  },
  {
    path: 'fdamountrequest',
    component: ViewcusOrderComponent
  },
  {
    path: 'fdownersettlement',
    component: StockproductComponent
  },

  {
    path: 'bankprocess',
    component: WithdrawComponent
  },
  
  {
  path: 'fixeddeposit',
  component:FixeddepositComponent
  },
  {
  path: 'loanpay',
  component:LoanpayComponent
  },
  {
    path: 'lendingdetail',
    component:LendingdetailComponent
    },
    {
      path:'profile',
      component:ProfileComponent
    },
   
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
