import { Component, OnInit } from '@angular/core';
import { ContractService } from "../contract.service";
import { Router } from '@angular/router';
import * as Web3 from 'web3';
declare let window: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  add: any;
  address: any = "Hai";
  status: string;
  balance: number;
  amount: number;
  All_bank = [];
  My_Bank = [];

  temp_bending_count : number = 0;
  temp_exp_count : number = 0;


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

    this.cs.isregister().then(result => { if (result == false) this.status = "Not Registered"; else this.status = "Registered"; })

    // this.cs.getAccount().then(function(add){ console.log("add "+add); this.address = add})

    this.cs.getAccount().then(add => this.address = add)
    this.cs.getUserBalance().then(bal => this.balance = bal)

    // console.log("Address " + this.address);
    
    // My Bank Registered Details
    // this.cs.getAccount().then(add => {
    //   this.cs.bank_detail(add).then(obj => {
    //     console.log("Address 1 " + this.address);
    //     if (obj[2])
    //       this.My_Bank.push({ "address": this.address, "broker_name": obj[0], "Bal": obj[1] + " Ξ", "token_count": obj[5], "lend_amt": obj[7] + " Ξ", "fix_amt_bank": obj[8] + " Ξ", "fix_amt_user": obj[9] + " Ξ", "borrow_amt": obj[6] + " Ξ", "Loan_int": obj[3] + " %", "Fix_dep_int": obj[4] + " %"})
    //   });
    // })

    // Other's Registered Details
    this.cs.bank_count().then(game => {
      game.forEach(item => {
        this.cs.bank_address(item).then(add => {
          // if (add != this.address)
            this.cs.bank_detail(add).then(obj => {
              if(obj[2])
              if (add != this.address)
                this.All_bank.push({ "address": add, "broker_name": obj[0], "Bal": obj[1] + " Ξ", "token_count": obj[5], "lend_amt": obj[7] + " Ξ", "fix_amt_bank": obj[8] + " Ξ", "fix_amt_user": obj[9] + " Ξ", "borrow_amt": obj[6] + " Ξ", "Loan_int": obj[3] + " %", "Fix_dep_int": obj[4] + " %"})
              else
                this.My_Bank.push({ "address": add, "broker_name": obj[0], "Bal": obj[1] + " Ξ", "token_count": obj[5], "lend_amt": obj[7] + " Ξ", "fix_amt_bank": obj[8] + " Ξ", "fix_amt_user": obj[9] + " Ξ", "borrow_amt": obj[6] + " Ξ", "Loan_int": obj[3] + " %", "Fix_dep_int": obj[4] + " %"})
            });
        })
      });
    })

    // function fun() {
    //   console.log(" Bank Address " + this.address);
    // }

    // fun();
    // this.cs.getAccount().then(address => this.address = address)
    // this.cs.getUserBalance().then(balance => this.balance = balance)
    // this.cs.bank_count().then(game =>{
    //   game.forEach(item => {
    //     this.cs.bank_detail(item).then(obj => {

    //       console.log("Obj "+obj);
    //       this.total_game.push({"address":obj[10],"broker_name":obj[0],"Bal":obj[1]+" Eth","Loan_int":obj[3],"Fix_dep_int":obj[4]})

    //     });
    //   });
    // })


    this.cs.loan_get_count().then(game =>{
    
      game.forEach(item => {
        this.cs.get_loan_id(item).then(add =>{
          this.cs.loan_detail(add).then(obj => 
          {
            let time = Math.round((new Date()).getTime() / 1000);

            if(obj[8].toNumber() == 0)
              return;              

            if(time >= (parseInt(obj[10])-60))
            {
              if( ((parseInt(obj[10])-60) <= time) && (time <= parseInt(obj[10])))
              {
                      this.temp_bending_count ++;
              }
              else
              {
                      this.temp_exp_count++;
              }
            }
            
            console.log("Bending : "+this.temp_bending_count);
            console.log("Expired : "+this.temp_exp_count);

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



  submit() {

    this.cs.isregister().then(result => {
      if (result == true)

        this.cs.deregister().then((res) => {
          console.log(res);

        });
      else
        alert("You have not registered");
    })
  }


}
