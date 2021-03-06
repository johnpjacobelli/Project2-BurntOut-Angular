import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { UserCreds } from '../services/usercreds';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  usercred:UserCreds = {'username':'', 'password':''};
  userfName:string;

  logingroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private loginserv: LoginService, private sessServ: SessionService) { }

  
  loginPost(login: FormGroup){
    
    this.usercred.username = login.get('username').value;
    this.usercred.password = login.get('password').value; 
    this.loginserv.postLogin(this.usercred).subscribe(
      response =>{


        localStorage.setItem('user', JSON.stringify(response));
        this.goHome();
      },
      error =>{
        window.alert('Unable to find user with that Username and Password');
      } 
    );
  }

  goHome():void {
    window.location.href='/';
  }

  ngOnInit(): void {
    if(this.sessServ.verifySession()){
      window.location.href = '/';
    }
  }

}
 