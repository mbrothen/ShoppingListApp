import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ErrorComponent } from '../error.component';
import { FormGroup } from '@angular/forms';
import { RestCallService } from '../rest-call.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public  username:  string  =  "";
  public  password:  string  =  "";
  form: FormGroup;  
  constructor(private dialog: MatDialog, private authService: RestCallService, private router: Router) {  }
  login(){

    if (this.username && this.password) {

      this.authService.authenticateUser(this.username, this.password).subscribe(
        () => {
          console.log("User Logged In");
          this.router.navigate(['shopping-list']);
        }
      )
    }
/*
    if(this.username  ===  "demo"  &&  this.password  === "demo")
        {
            this.router.navigate(['shopping-list']);
        }
        else
        {
            this.dialog.open(ErrorComponent,{ data: {
            message:  "Your login information are incorrect!"
            }});
        }

*/
  }

  ngOnInit() {
  }

}
