import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./modules/user/auth/components/auth/auth.component";
import {HeadersComponent} from "./components/headers/headers.component";

const routes: Routes = [{path: "", component: HeadersComponent},
  {
  path: "auth", loadChildren:()=> import("./modules/user/auth/auth.module").then(m=>m.AuthModule)
},{
  path: "choice", loadChildren: ()=> import("./modules/user/learning/learning.module").then(m=>m.LearningModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
