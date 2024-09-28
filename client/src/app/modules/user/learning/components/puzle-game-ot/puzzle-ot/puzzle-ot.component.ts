import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../../services/manage-words.service";
import {IDataP} from "../../../../../../interfaces/change-progres-body.interface";

@Component({
  selector: 'app-puzzle-ot',
  templateUrl: './puzzle-ot.component.html',
  styleUrl: './puzzle-ot.component.css'
})
export class PuzzleOTComponent implements OnInit{

  @Input()
  word: IWords

  @Input()
  wordsA: IWords[]

  @Input()
  number: number

  @Input()
  correct: number

  @Output()
  newItemEmitter = new EventEmitter<number>()

  constructor(private manageWordsService : ManageWordsService) {
  }

  ngOnInit(): void {
  }

  addItem(value:number){
    this.newItemEmitter.emit(value)
  }

  checkCorrect(word: any) {
    this.newItemEmitter.emit(word)

    this.correct = 1

  }

}
