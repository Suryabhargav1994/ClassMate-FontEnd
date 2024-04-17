import { Component, OnInit, VERSION } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from './utlis/validation';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phonenumber: new FormControl(''),
  });
  submitted = false;
  passwordHidden = true;
  emailexists = false;
  isLoader = false;
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, 
    private router:Router,
    private ngxService: NgxUiLoaderService,) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group( 
      {
        firstname: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        lastname: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
        ],
        phonenumber: ['', Validators.required],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if(this.form.valid){
    this.ngxService.start();
    this.isLoader  = true;
    this.apiservice.register(this.form.value).subscribe((result: any)=> {
      if(result && result.status ===  "200"){
        this.emailexists = false;
        this.ngxService.stop();
        this.isLoader = false;
        setTimeout(() => {
          this.router.navigate(["login"])
        },2000)
      }
      else {
        if(result.status === "401"){
          this.ngxService.stop();
          this.emailexists = true;
          this.isLoader = false;
        }
      }
    },(err) => {
      this.ngxService.stop();
      this.isLoader = false;
      // this.toastr.error(err.error.message);
    })
  }
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }
}
