import { Component, OnInit ,NgModule} from '@angular/core';
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any;
import {ContractService} from "../contract.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})



export class ProductComponent implements OnInit{

 public model:{};
 public bankname:string;
 public fdint:string;
 public lnint:number;
 

 public account: string = null;
public balance:number;
public  _web3: any;
public id1:any
public id2:any;

public _tokenContract: any;
public _tokenContractAddress: string = "0xce164ca85e8fb5d01150f25ff0f96443f16fe0cd";

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

submit()
{
this.cs.register(this.bankname,this.fdint,this.lnint);
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

ngOnDestroy() {
 if (this.id1) {
   clearInterval(this.id1);
 }
 if (this.id2) {
     clearInterval(this.id2);
   }
}


}

