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
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  passwordHidden = true;
  emailexists = false;

  constructor(private formBuilder: FormBuilder,
    private apiservice: ApiService,
    private ngxService: NgxUiLoaderService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
          ],
        ],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.form.valid){
      debugger
      this.ngxService.start();
      this.apiservice.login(this.form.value).subscribe((result: any)=> {
        if(result && result.status ===  "200"){
          this.emailexists = false;
          localStorage.setItem("UserId",result.data.user_id);
          setTimeout(() => {
            this.router.navigate(["uni-list"])
          },2000)
        }
        else {
          if(result.status === "401"){
            this.emailexists = true;
          }
        }
      },(err) => {
        // this.ngxService.stop();
        // this.toastr.error(err.error.message);
      })
    }
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }
}
