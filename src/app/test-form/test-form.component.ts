import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import validate = WebAssembly.validate;
import {BehaviorSubject} from "rxjs";

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
  @Input() selectedTreeItems: any;

  constructor() {
  }


  formatLabel(value: number) {

    return Math.round(value) + 'Y';


    return value;
  }


  submitForm() {
    console.log(this.profileForm.get('age').errors)
    if (this.profileForm.valid) {
      console.log(this.profileForm.value)
    } else {
      console.log(this.profileForm.errors)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.selectedTreeItems)
  }

  ngOnInit(): void {

    var eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = function (e) {
      console.log(e.data);
    };


  }

}
