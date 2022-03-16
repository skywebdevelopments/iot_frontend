import { Component, OnInit } from '@angular/core';
import { GenerateTokenService } from '../../service/user/generate-token.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component'
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form_login: any;
  //  user_data = true

  constructor(
    private formBuilder: FormBuilder,
    private service_generateToken: GenerateTokenService,
    private dialog: MatDialog,
    private router: Router,

  ) { }
  init_form() {
    // validators 
    // name min length 
    // required.
    this.form_login = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

checkToken(){
  let token_key= localStorage.getItem('token');

  if (token_key){
    this.router.navigateByUrl('/dashboard')
    
  }
  else{
    this.router.navigateByUrl('/')

  }
 
}
  onsubmit() {
    // check the form is valid 

    if (this.form_login.valid) {

      

      // submit the form
      this.service_generateToken.service_generate_token(this.form_login.value).then(res => {
        // this.user_data = true;
        if (res['code'] === 404) {

          this.Invalid_login()

        }
        else {
          this.router.navigateByUrl('listGroup')
          this.form_login.reset();
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }


  Invalid_login() {

    let dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.router.navigateByUrl('signup'); 
      }
      else {
        this.form_login.reset();
      }

    })

    this.form_login.reset();
  }

  ngOnInit(): void {
    // this.checkToken();
    this.init_form();
  }


}
