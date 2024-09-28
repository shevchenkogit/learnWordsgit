import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../../services/manage-words.service";
import {IDataP} from "../../../../../../interfaces/change-progres-body.interface";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-puzzle-two-to',
  templateUrl: './puzzle-two-to.component.html',
  styleUrl: './puzzle-two-to.component.css'
})
export class PuzzleTwoTOComponent implements OnInit{

  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`

  @Input()
  word: IWords

  @Input()
  wordsA: IWords[]

  @Input()
  number: any

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
    if (this.number === word){
      let body: IDataP = {w: "h", idW: word, idU: this.token.jti}
      this.manageWordsService.changeProgressLevel(body, this.tokenS).subscribe()

     this.newItemEmitter.emit(1)
      // console.log('correct')
    }else{
      // console.log('IIIIII correct')
      this.newItemEmitter.emit(0)
    }
  }
}
