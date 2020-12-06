import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public email:string = '';
  public password:string = '';
  
  ngOnInit() {}
  onAddUser(form: UserI){
    console.log('???ANDAAAA');
    const userRegister=form;
    this.authService.registerUser(userRegister)
    .then((res)=> {
     this.router.navigate(['/']);
    }).catch(err => console.log('err', err.message));
  }

}
