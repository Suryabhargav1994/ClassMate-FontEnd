import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppDetailsComponent } from './app-details/app-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { UniListComponent } from './uni-list/uni-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AmentityListComponent } from './amentity-list/amentity-list.component';
// import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from "ngx-ui-loader";
import { AccomadationComponent } from './accomadation/accomadation.component';
import { MatDialogModule } from '@angular/material/dialog';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsSize: 100,
  fgsColor: '#f0f0f0',
  fgsType: SPINNER.threeStrings,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupComponent,
    AppDetailsComponent,
    UniListComponent,
    AmentityListComponent,
    AccomadationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
