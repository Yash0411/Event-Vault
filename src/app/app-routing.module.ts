import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentComponent } from './current/current.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { CompletedComponent } from './completed/completed.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DevelopersComponent } from './developers/developers.component'

const routes: Routes = [
  {path:"",redirectTo:"/current",pathMatch:"full"},
  {path:"current",component:CurrentComponent},
  {path:"suggested",component:SuggestedComponent},
  {path:"completed",component:CompletedComponent},
  {path:"signin",component:UserProfileComponent},
  {path:"developers",component:DevelopersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
