import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-accomadation",
  templateUrl: "./accomadation.component.html",
  styleUrls: ["./accomadation.component.scss"],
})
export class AccomadationComponent implements OnInit {
  submitted = false;
  inputValue: string = "";
  selectedUniversityId!: string;
  selectedAccomdationId!: string;
  universityOptions: any;
  uniLinkDisable: boolean = true;
  form: FormGroup = new FormGroup({
    name: new FormControl(""),
    address: new FormControl(""),
    price: new FormControl(""),
    availability: new FormControl(""),
    furnituredname: new FormControl(""),
  });
  uniLinkForm: FormGroup = new FormGroup({
    distance: new FormControl(""),
  });
  formBuilder: any;
  universityId!: string;
  accomadationArray: any;
  constructor(
    private apiservice: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.universityId = params["universityId"];
      this.loadAccList(this.universityId);
    });
    this.universityList();
    this.form = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      address: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      price: ["", [Validators.required]],
      availability: ["", [Validators.required]],
      furnituredname: ["", [Validators.required]],
    });
    this.uniLinkForm = this.formBuilder.group({
      distance: ["", Validators.required],
    });
  }

  public universityList() {
    this.apiservice.universities().subscribe((result: any) => {
      if (result) {
        this.universityOptions = result.data;
      }
    });
  }

  loadAccList(uni_id: any) {
    this.apiservice.listOfAccom(uni_id).subscribe((result: any) => {
      this.accomadationArray = result.data;
    });
  }

  public accomadationRegister() {
    for (const controlName in this.form.controls) {
      if (this.form.controls.hasOwnProperty(controlName)) {
        const control = this.form.get(controlName);
        if (!control?.value) {
          this.submitted = true;
          return;
        }
      }
    }
    if (this.form.valid) {
      this.apiservice
        .accomadationRegister(this.form.value)
        .subscribe((response: any) => {
          if (response && response.status === "200") {
            localStorage.setItem("acc_id", response.data.acc_id);
            this.form.reset();
            this.uniLinkDisable = false;
          }
        });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public accUniLink() {
    const payload = {
      university_id: this.selectedUniversityId,
      accomidation_id: localStorage.getItem("acc_id"),
      distance: this.inputValue,
    };
    this.apiservice.accUniLink(payload).subscribe((response: any) => {
      if (response) {
        this.router.navigate(["uni-list"]);
      }
    });
  }
}
