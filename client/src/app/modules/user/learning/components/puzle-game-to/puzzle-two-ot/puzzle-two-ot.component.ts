import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../../services/manage-words.service";

@Component({
  selector: 'app-puzzle-two-ot',
  templateUrl: './puzzle-two-ot.component.html',
  styleUrl: './puzzle-two-ot.component.css'
})
export class PuzzleTwoOTComponent implements OnInit{

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
