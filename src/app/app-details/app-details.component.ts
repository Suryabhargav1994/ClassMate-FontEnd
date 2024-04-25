import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../api.service";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-app-details",
  templateUrl: "./app-details.component.html",
  styleUrls: ["./app-details.component.scss"],
})
export class AppDetailsComponent implements OnInit {
  universityId!: string;
  accomadationArray: any[] = [];
  showBooked: boolean = false;
  searchQuery: string = "";
  distanceQuery: string = "";
  showMenuBox: boolean = false;
  user: any = {};
  constructor(
    private route: ActivatedRoute,
    private apiservice: ApiService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.universityId = params["universityId"];
      this.loadAccList(this.universityId);
      this.applySearchFilter();
      this.applyDistanceFilter();
      this.getUserDetails();
    });
  }

  loadAccList(uni_id: any) {
    this.apiservice.listOfAccom(uni_id).subscribe((result: any) => {
      this.accomadationArray = result.data.map((accommodation: any) => ({
        ...accommodation,
        booked: false,
      }));
      console.log(this.accomadationArray);
    });
  }

  applySearchFilter(): void {
    if (this.searchQuery.trim() === "") {
      this.loadAccList(this.universityId);
    } else {
      this.accomadationArray = this.accomadationArray.filter(
        (accommodation: any) =>
          accommodation.accomidation_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    }
  }

  applyDistanceFilter(): void {
    if (this.distanceQuery.trim() === "") {
      this.loadAccList(this.universityId);
    } else {
      this.accomadationArray = this.accomadationArray.filter(
        (accommodation: any) =>
          accommodation.distance
            .toLowerCase()
            .includes(this.distanceQuery.toLowerCase())
      );
    }
  }

  bookedHouse(acc_id: any) {
    this.apiservice.booking(acc_id).subscribe((result: any) => {
      if (result && result.status === "200") {
        const accommodation = this.accomadationArray.find(
          (acc) => acc.accomidation_id === acc_id.accomidation_id
        );
        if (accommodation) {
          accommodation.booked = true;
        }
      }
    });
  }

  toggleMenuBox() {
    this.showMenuBox = !this.showMenuBox;
  }

  getUserDetails() {
    const personId = localStorage.getItem("UserId");
    this.apiservice.getUserDetails(personId).subscribe(
      (response: any) => {
        this.user = response.data[0];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteAccommodation(accommodation: any) {
    this.apiservice
      .deleteAccommodation(accommodation.accomidation_id)
      .subscribe(
        (response: any) => {
          this.loadAccList(this.universityId);
        },
        (error: any) => {
          console.error("Error deleting accommodation:", error);
        }
      );
  }

  redirectAminity() {
    this.router.navigate(["aminity"]);
  }

  navigateUrl() {
    this.router.navigate(["login"]);
  }

  navigateUrlTo() {
    this.router.navigate(["uni-list"]);
  }

  accPopUp() {
    this.router.navigate(["accomdation"], {
      queryParams: { universityId: this.universityId },
    });
  }
}
