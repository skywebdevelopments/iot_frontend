import { Component, OnInit } from '@angular/core';
import { GenerateTokenService } from '../../service/user/generate-token.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form_login: any;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private service_generateToken: GenerateTokenService
  ) { }
  init_form() {
    // validators 
    // name min length 
    // required.
    this.form_login = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  
  onsubmit() {
    // check the form is valid 
    if (this.form_login.valid) {
      // submit the form
      this.service_generateToken.service_generate_token(this.form_login.value).then(res => {
        this.form_login.reset();

      })
    }
  }
  ngOnInit(): void {
    this.init_form();
  }



}
