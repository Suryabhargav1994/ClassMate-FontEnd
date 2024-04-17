import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-amentity-list',
  templateUrl: './amentity-list.component.html',
  styleUrls: ['./amentity-list.component.scss']
})
export class AmentityListComponent implements OnInit {
  amenities: any;
  submitted = false;
  form: FormGroup = new FormGroup({
    amenityName: new FormControl(''),
  });
  constructor(private apiservice: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listAminity();
    this.form = this.formBuilder.group( 
      {
        amenityName: [
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

  listAminity(){
   this.apiservice.listOfAminity().subscribe((result:any) => {
    this.amenities = result.data;
   })
  }

  aminityRegister(){
    if(!this.form.value) {
      return 
    }
    if(this.form.valid){
    this.apiservice.aminity(this.form.value).subscribe((response: any) => {
      if(response && response.status === "200"){
         this.form.reset();
         this.listAminity();
      }
    })
  }
  }

}
