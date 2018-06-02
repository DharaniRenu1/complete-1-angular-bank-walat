import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any;

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  public model:{};
  public depositadd:number;
  public depositamt:number;
  public withdraw:number;
  account:string;
  public bank_address:number;

  public amount:number;
  public tokenaddress:number;
  public bankaddress:number;

  // public account: string = null;
  // public balance:number;
  public  _web3: any;
  public id1:any
  public id2:any;

  constructor(private de:ContractService,private route:Router) {

    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);      
    }

    de.getAccount().then(account=> this.account = account);
 
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





  }
  dep(){
    this.de.isregister().then(result =>{
      if(result == true)
  
      this.de.deposit(this.depositamt).then((res)=>{
      console.log(res);
    
      });
      else
      alert("You have not Register");
    })
  }
  wit(){
  
    this.de.acc_bal().then(result =>{
      if(result >= this.withdraw)

        this.de.withdraw(this.withdraw).then((res)=>{
        console.log(res);
        
        });
        else
        alert("You have a not enough balance");
      })
  }
  token(){
    this.de.isregister().then(result =>{
      if(result == true)
  
        this.de.token(this.tokenaddress).then((res)=>{
        console.log(res);
        
      });
      else
      alert("You have not Register");
    })
  }
  trans(){
    this.de.acc_bal().then(result =>{
      if(result >= this.withdraw)
  
        this.de.transfer(this.bank_address,this.amount).then((res)=>{
        console.log(res);
        
        });
      else
        alert("You have a not enough balance");
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
