import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './Register/product.component';
import { UpdateproductComponent } from './loanrequest/updateproduct.component';
import { ViewcusOrderComponent } from './fduserrequest/viewcus-order.component';
import { StockproductComponent } from './fdownersettlement/stockproduct.component';
import { WithdrawComponent } from './bankprocess/withdraw.component';
import { ContractService } from './contract.service';
import { FixeddepositComponent } from './fixeddeposit/fixeddeposit.component';
import { LoanpayComponent } from './loanpay/loanpay.component';
import { LendingdetailComponent } from './lendingdetail/lendingdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { MetamaskErrorComponent } from './metamask-error/metamask-error.component';

import { AuthGuardGuard } from './auth-guard.guard';
import { BankguardGuard } from './bankguard.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    UpdateproductComponent,
    ViewcusOrderComponent,
    StockproductComponent,
  
    WithdrawComponent,
    FixeddepositComponent,
    LoanpayComponent,
    LendingdetailComponent,
    ProfileComponent,
    MetamaskErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ContractService,
    AuthGuardGuard,BankguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
