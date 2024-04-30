import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { NgForm } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private accountService:AccountService){}

  model:User = new User();

  login(form:NgForm){
    this.accountService.login(this.model)
  }
}
