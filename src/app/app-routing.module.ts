import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { SignupComponent } from './signup/signup.component';
import { UniListComponent } from './uni-list/uni-list.component';
import { AmentityListComponent } from './amentity-list/amentity-list.component';
import { AccomadationComponent } from './accomadation/accomadation.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'uni-list', component: UniListComponent },
  { path: 'details', component: AppDetailsComponent },
  { path: 'aminity', component: AmentityListComponent },
  { path: 'accomdation', component: AccomadationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
