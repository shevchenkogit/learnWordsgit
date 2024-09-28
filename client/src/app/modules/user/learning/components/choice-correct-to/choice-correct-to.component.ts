import {Component, Input, OnInit} from '@angular/core';
import {IWords} from "../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-choice-correct-to',
  templateUrl: './choice-correct-to.component.html',
  styleUrl: './choice-correct-to.component.css'
})
export class ChoiceCorrectTOComponent implements OnInit{


  newWords: IWords[]
  one: number = 0
  s: boolean = false

  t: string = "t"
  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`

  constructor(private manageWordsService:ManageWordsService) {
  }

  ngOnInit(): void {
    this.manageWordsService.getNewWords("t", this.token.jti, this.tokenS).subscribe(value => {
      this.newWords = value.slice(0, 5)
      // if (value){
      //   this.generateRandom(value.length - 1)
      // }
    })
  }

  public generateRandom(x: number): void {
      this.one = Math.floor(Math.random() * x)
  }

  addItem(s: number) {
    if(s === 1){
      this.s = true
    }else {
      this.s = false
    }
  }

  getNewWords():void {
    this.manageWordsService.getNewWords("t", this.token.jti, this.tokenS).subscribe(value => {
      this.newWords = value.slice(0, 5)
      // if (value){
      //   this.generateRandom(value.length - 1)
      // }
    })
  }

  next() {
    this.getNewWords()
    this.one = this.one + 1
    this.s = false

    if (this.one === this.newWords.length){
      this.one = 0
    }
  }
}
