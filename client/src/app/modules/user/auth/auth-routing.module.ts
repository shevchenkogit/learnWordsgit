import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./components/auth/auth.component";
import {LogInComponent} from "./components/log-in/log-in.component";
import {SighInComponent} from "./components/sigh-in/sigh-in.component";

const routes: Routes = [
  {path: '', component: AuthComponent},{
    path: "logIn", component: LogInComponent
  },{
    path: "sighIn", component: SighInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
