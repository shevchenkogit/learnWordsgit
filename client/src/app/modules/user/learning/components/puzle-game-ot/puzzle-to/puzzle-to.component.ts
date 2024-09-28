import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../../services/manage-words.service";
import {IDataP} from "../../../../../../interfaces/change-progres-body.interface";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-puzzle-to',
  templateUrl: './puzzle-to.component.html',
  styleUrl: './puzzle-to.component.css'
})
export class PuzzleToComponent implements OnInit{

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
      // this.newItemEmitter.emit(word)
    if (this.number === word){

      // console.log('correct')
      let body: IDataP = {w: "g", idW: word, idU: this.token.jti}
      this.manageWordsService.changeProgressLevel(body, this.tokenS).subscribe()

      this.newItemEmitter.emit(1)

    }else{
      // console.log('IIIIII correct')
      this.newItemEmitter.emit(0)
    }
    // console.log(this.number)


  }
}
