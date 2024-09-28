import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import {AddWordsComponent} from "./components/add-words/add-words.component";
import {LearningGameComponent} from "./components/learning-game/learning-game.component";
import {ChoiceComponent} from "./components/choice/choice.component";
import {ReactiveFormsModule} from "@angular/forms";
import {GetLibComponent} from "./components/get-lib/get-lib.component";
import {OneWordComponent} from "./components/one-word/one-word.component";
import {CadsComponent} from "./components/cads/cads.component";
import {ChoiceCorrectTOComponent} from "./components/choice-correct-to/choice-correct-to.component";
import {ChoiceCorrectOTComponent} from "./components/choice-correct-ot/choice-correct-ot.component";
import {PuzleGameComponent} from "./components/puzle-game/puzle-game.component";
import {PuzleGameTOComponent} from "./components/puzle-game-to/puzle-game-to.component";
import {PuzleGameOTComponent} from "./components/puzle-game-ot/puzle-game-ot.component";
import {WriterTOComponent} from "./components/writer-to/writer-to.component";
import {GameToComponent} from "./components/choice-correct-to/game-to/game-to.component";
import {GameOtComponent} from "./components/choice-correct-ot/game-ot/game-ot.component";
import {PuzzComponent} from "./components/puzle-game/puzz/puzz.component";
import {PuzzleOTComponent} from "./components/puzle-game-ot/puzzle-ot/puzzle-ot.component";
import {PuzzleToComponent} from "./components/puzle-game-ot/puzzle-to/puzzle-to.component";
import {PuzzleTwoTOComponent} from "./components/puzle-game-to/puzzle-two-to/puzzle-two-to.component";
import {PuzzleTwoOTComponent} from "./components/puzle-game-to/puzzle-two-ot/puzzle-two-ot.component";
import {AllLibPageComponent} from "./components/all-lib-page/all-lib-page.component";
import {OneWordForAllComponent} from "./components/all-lib-page/one-word-for-all/one-word-for-all.component";


@NgModule({
  declarations: [
    ChoiceComponent,
    AddWordsComponent,
    LearningGameComponent,
    GetLibComponent,
    OneWordComponent,
    CadsComponent,
    ChoiceCorrectTOComponent,
    ChoiceCorrectOTComponent,
    PuzleGameComponent,
    PuzleGameTOComponent,
    PuzleGameOTComponent,
    WriterTOComponent,
    GameToComponent,
    GameOtComponent,
    PuzzComponent,
    PuzzleOTComponent,
    PuzzleToComponent,
    PuzzleTwoTOComponent,
    PuzzleTwoOTComponent,
      AllLibPageComponent,
      OneWordForAllComponent
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    ReactiveFormsModule,

  ]
})
export class LearningModule { }
