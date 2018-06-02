import { Component, OnInit } from '@angular/core';
import {ContractService} from "../contract.service";
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any;
@Component({
  selector: 'app-lendingdetail',
  templateUrl: './lendingdetail.component.html',
  styleUrls: ['./lendingdetail.component.scss']
})
export class LendingdetailComponent implements OnInit {

  add : any;
  address : string;
  balance : number;
  amount : number;
  Loan_pro = [];

  public account: string = null;
  // public balance:number;
  public  _web3: any;
  public id1:any
  public id2:any;


constructor(private cs: ContractService,private route:Router) {
  if (typeof window.web3 !== 'undefined') {
    this._web3 = new Web3(window.web3.currentProvider);      
  }
    
}



public metamask(){
  if (typeof window.web3 == 'undefined') {
    return false;
  }
  else{
    this.getAccount().then(access =>{
        if (access == null){
          return false;
        }
        else{
          return true;
        }
    });
  }
}

public async getAccount(): Promise<string> {
  if (this.account == null) {
    this.account = await new Promise((resolve, reject) => {
      this._web3.eth.getAccounts((err, accs) => {
        if (err != null) {
          this.route.navigate(['metamask']);
          return;
        }
        if (accs.length === 0) {
          this.route.navigate(['metamask']);
          return;
        }
        resolve(accs[0]);
      })
    }) as string;
    this._web3.eth.defaultAccount = this.account;
  }
  return Promise.resolve(this.account);
}



  ngOnInit() {


    let meta=this;
    meta.getAccount().then(acc => { 
        this.account = acc;
        meta.id1 = setInterval(function() {
         if (typeof window.web3 !== 'undefined') {
             meta._web3 = new Web3(window.web3.currentProvider);
             if (meta._web3.eth.accounts[0] !== meta.account) {
                 meta.account = meta._web3.eth.accounts[0];
                 if (meta._web3.eth.accounts[0] === undefined) {
                     meta.route.navigate(['metamask']);
                     clearInterval(this.interval);
                 } else {
                     alert('Address Change Detected Please Refresh Page');
                 }
             }
         } else {
             meta.route.navigate(['metamask']);
         }
        }, 200);
     });
  
     meta.id2 = setInterval(function() {
     }, 20000);


    this.cs.loan_pro_count().then(game =>{
    
      game.forEach(item => {
        this.cs.pro_loan_id(item).then(add =>{
          this.cs.loan_detail(add).then(obj => 
          {
            this.Loan_pro.push({"id":add,"borrower_add":obj[2],"token_add":obj[3],"amt":obj[4]+" Ξ","settlement":obj[5],"next_settle_time":obj[6],"month":obj[7],"bal_loan":obj[8]+" Ξ","current_inst":obj[9]+" Ξ"})
          });
        })
      });
    })

  }


  ngOnDestroy() {
    if (this.id1) {
      clearInterval(this.id1);
    }
    if (this.id2) {
        clearInterval(this.id2);
      }
  }

  
}
