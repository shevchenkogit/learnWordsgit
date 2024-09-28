import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChoiceComponent} from "./components/choice/choice.component";
import {AddWordsComponent} from "./components/add-words/add-words.component";
import {LearningGameComponent} from "./components/learning-game/learning-game.component";
import {GetLibComponent} from "./components/get-lib/get-lib.component";
import {ChoiceCorrectTOComponent} from "./components/choice-correct-to/choice-correct-to.component";
import {ChoiceCorrectOTComponent} from "./components/choice-correct-ot/choice-correct-ot.component";
import {PuzleGameComponent} from "./components/puzle-game/puzle-game.component";
import {PuzleGameTOComponent} from "./components/puzle-game-to/puzle-game-to.component";
import {PuzleGameOTComponent} from "./components/puzle-game-ot/puzle-game-ot.component";
import {CadsComponent} from "./components/cads/cads.component";
import {WriterTOComponent} from "./components/writer-to/writer-to.component";
import {AllLibPageComponent} from "./components/all-lib-page/all-lib-page.component";

const routes: Routes = [

  {path: '', component: ChoiceComponent
  },{
    path: "learn", component: LearningGameComponent,
    children: [{path: "cards", component: CadsComponent},
      {path:"choiceTo", component: ChoiceCorrectTOComponent},
      {path:"choiceOt", component: ChoiceCorrectOTComponent},
      {path:"puzzle", component: PuzleGameComponent},
      {path:"puzzleTo", component: PuzleGameTOComponent},
      {path:"puzzleOt", component: PuzleGameOTComponent},
      {path:"write", component: WriterTOComponent}
    ]

  },{path: "add", component: AddWordsComponent},
    {path: "lib", component: GetLibComponent},
  {path: "lib-all", component: AllLibPageComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
