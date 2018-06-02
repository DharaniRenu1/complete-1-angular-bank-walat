import { Component, OnInit } from '@angular/core';
import {ContractService} from "../contract.service";
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any;
@Component({
  selector: 'app-fixeddeposit',
  templateUrl: './fixeddeposit.component.html',
  styleUrls: ['./fixeddeposit.component.scss']
})
export class FixeddepositComponent implements OnInit {

  public model:{};
  public bankaddress:string;
  public depositamount:number;
  public periodinyrs:number;

  add : any;
  address : string;
  balance : number;
  amount : number;
  All_bank1 = [];


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



    this.cs.getAccount().then(address => this.address = address)
    this.cs.getUserBalance().then(balance => this.balance = balance)
    this.cs.bank_count().then(game =>{
    
      game.forEach(item => {
        this.cs.bank_address(item).then(add =>{
          if (add != this.address)
          this.cs.bank_detail(add).then(obj => 
          {
            this.All_bank1.push({"address":add,"bank_name":obj[0],"Bal":obj[1]+" Ξ","Fix_dep_int":obj[4]+" %"})
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
  submit(){
    
   this.cs.isregister().then(result =>{
     if(result == true)
    this.cs.fixeddeposit(this.bankaddress,this.depositamount,this.periodinyrs).then((res)=>{
      console.log(res)
    });
    
    else
      alert("You have not Register");

   })
  }
  
}
