import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null,
  
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(

  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password } = this.form;
  }

  "http://localhost:3000/auth/google"
  

  reloadPage(): void {
    window.location.reload();
  }

}
