import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import Validation from './utlis/validation';

@Component({
  selector: 'app-uni-list',
  templateUrl: './uni-list.component.html',
  styleUrls: ['./uni-list.component.scss']
})
export class UniListComponent implements OnInit {
  universityOptions: any;
  options : any;
  submitted = false;
  selectedUniversityId!: string;
  form: FormGroup = new FormGroup({
    universityName: new FormControl(''),
    universityAddress: new FormControl(''),
  });

  constructor(private apiservice: ApiService,
    private ngxService: NgxUiLoaderService,
    private router:Router,private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.universityList();
    this.form = this.formBuilder.group( 
      {
        universityName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        universityAddress: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
      },
    );
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public universityList() {
    this.apiservice.universities().subscribe((result: any)=>{
       if(result){
          this.universityOptions = result.data;
       }
    })
  }


  public apply() {
    if (this.selectedUniversityId) {
        this.router.navigate(['/details'], { queryParams: { universityId: this.selectedUniversityId } });
    }
}

public uniRegister(){
  if(!this.form.value) {
    return 
  }
  if(this.form.valid){
  this.apiservice.uniRegister(this.form.value).subscribe((result:any) => {
  if(result && result.status === "200"){
   this.form.reset();
   this.universityList();
  }
  }
);
}
}

}
