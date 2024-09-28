import {Component, OnInit} from '@angular/core';
import {IWords} from "../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-puzle-game-to',
  templateUrl: './puzle-game-to.component.html',
  styleUrl: './puzle-game-to.component.css'
})
export class PuzleGameTOComponent implements OnInit{



  words: IWords[]
  one: any
  s: boolean = false
  newWordsO: IWords[]
  newWordsT: IWords[]
  t: string = 'h'
  n: number
  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`

  constructor(private manageWordsService:ManageWordsService) {
  }

  ngOnInit(): void {
    this.getNewWords()
  }


  addItem(s: any) {
    this.one = s
  }

  getNewWords():void {
    this.manageWordsService.getNewWords(this.t, this.token.jti, this.tokenS).subscribe(value => {
      this.newWordsO = value.slice(0, 5).sort(function (a, b) {
        if (a.original < b.original) {
          return -1;
        }
        if (a.original > b.original) {
          return 1;
        }
        return 0;
      })
      this.newWordsT= value.slice(0, 5)
    })
  }

  next() {
    this.s = false}

  addCheck(b: number) {
    if(b === 1){
      this.getNewWords()
    }else {

    }
  }
}
