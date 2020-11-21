import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import validate = WebAssembly.validate;
@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl('', Validators.required),
  });
  constructor() { }

  submitForm(){
    console.log(this.profileForm.get('age').errors)
   if(this.profileForm.valid){
      console.log(this.profileForm.value)
   }
   else{
     console.log(this.profileForm.errors)
   }
  }
  ngOnInit(): void {
  }

}
