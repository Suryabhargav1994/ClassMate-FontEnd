import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AccomadationComponent } from '../accomadation/accomadation.component';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {
  universityId!: string;
  accomadationArray: any;
  showBooked: boolean = false;
  constructor(private route: ActivatedRoute,private apiservice: ApiService,private ngxService: NgxUiLoaderService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.universityId = params['universityId'];
      console.log(this.universityId);
      this.loadAccList(this.universityId)
      
  });
  }
  
loadAccList(uni_id:any){
  this.apiservice.listOfAccom(uni_id).subscribe((result:any) => {
    this.accomadationArray = result.data;
  });
}


bookedHouse(acc_id: any){
  this.apiservice.booking(acc_id).subscribe((result: any) => {
    console.log(result);
    if(result && result.status === "200"){
    this.showBooked = true;
  }
  })
}

redirectAminity(){
  this.router.navigate(["aminity"])
}

navigateUrl() {
  this.router.navigate(["login"])
}

navigateUrlTo() {
  this.router.navigate(["uni-list"])
}

accPopUp(){
this.router.navigate(["accomdation"], { queryParams: { universityId: this.universityId } });
}

}