import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../../services/manage-words.service";
import {IDataP} from "../../../../../../interfaces/change-progres-body.interface";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-game-ot',
  templateUrl: './game-ot.component.html',
  styleUrl: './game-ot.component.css'
})
export class GameOtComponent implements OnInit{

  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`

  @Input()
  word: IWords

  @Input()
  wordsA: IWords[]

  @Input()
  number: number

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

  checkCorrect(id:number) {
    if(id === this.wordsA[this.number].id){
      let body: IDataP = {w:"o", idW: id, idU: this.token.jti}
      this.manageWordsService.changeProgressLevel(body, this.tokenS).subscribe()
      this.correct = 1
      // this.newItemEmitter.emit(Math.floor(Math.random() * this.wordsA.length))
      this.newItemEmitter.emit(1)
    }else {
      this.correct = 2
      this.newItemEmitter.emit(2)
    }
  }

}
