import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LearningGameComponent} from "./learning/components/learning-game/learning-game.component";

const routes: Routes = [{
  // path: '', component: LearningGameComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
