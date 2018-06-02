import {ContractService} from "../contract.service";
import { Component, OnInit,OnDestroy } from '@angular/core';
import * as Web3 from 'web3';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
declare let window: any;

@Component({
  selector: 'app-stockproduct',
  templateUrl: './stockproduct.component.html',
  styleUrls: ['./stockproduct.component.scss']
})
export class StockproductComponent implements OnInit {
  public model:{};
  public fix_idowner:number;
  add : any;
  games : any
  address : string;
  balance : number;
  amount : number;
  fix_dep = [];
  pay_due : any;


  public account: string = null;
// RouterLinkpublic balance:number;
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
    
    this.cs.my_clients_count().then(game =>{
      game.forEach(item => {
        this.cs.my_clients_dep_id(item).then(add =>{
          this.cs.fix_dep_detail(add).then(obj => 
          {
            this.fix_dep.push({"id":add,"user_add":obj[2],"amt":obj[3]+" Ξ","End_time":obj[4],"status":obj[6]})
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
    
    console.log(this.fix_idowner);
     
     this.cs.fdowner(this.fix_idowner).then((res)=>{
 
     });
   }

}
