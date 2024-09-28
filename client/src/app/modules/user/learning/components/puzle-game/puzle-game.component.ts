import {Component, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {IDataP} from "../../../../../interfaces/change-progres-body.interface";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-puzle-game',
  templateUrl: './puzle-game.component.html',
  styleUrl: './puzle-game.component.css'
})
export class PuzleGameComponent implements OnInit{


  n: boolean = false
  words: IWords[]
  one: number = 0
  s: boolean = false
  newWords: IWords[]
  t: string = "p"
  puzzleWord: any
  bul: boolean
  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`

  constructor(private manageWordsService:ManageWordsService) {
  }

  ngOnInit(): void {

    this.manageWordsService.getNewWords("p", this.token.jti, this.tokenS).subscribe(value => {
      this.newWords = value.slice(0, 5)

      localStorage.setItem("word", `${this.newWords[this.one].original}`)
      this.puzzleWord =  localStorage.getItem("word");
    })

  }

  public generateRandom(x: number): void {
    this.one = Math.floor(Math.random() * x)


    localStorage.setItem("word", `${this.newWords[this.one].original}`)
    this.puzzleWord =  localStorage.getItem("word");

  }

  addItem(s: number) {
    this.s = true

  }


  getNewWords():void {
    this.manageWordsService.getNewWords(this.t, this.token.jti, this.tokenS).subscribe(value => {
      this.newWords = value.slice(0, 5)
      // this.generateRandom(value.length - 1)

      localStorage.setItem("word", `${this.newWords[this.one].original}`)
      this.puzzleWord =  localStorage.getItem("word");
    })
  }


  next() {

    let r = ""
    localStorage.setItem("word", r)
    this.puzzleWord = localStorage.getItem("word");

    let body: IDataP = {w: this.t, idW: this.newWords[this.one].id, idU: this.token.jti}
    this.manageWordsService.changeProgressLevel(body, this.tokenS).subscribe()

    this.getNewWords()
    // let d = document.querySelector('.choiceAria')
    // let h = document.querySelector('.h')

    this.one = this.one + 1

    this.n = false

    if (this.one === this.newWords.length){
      this.one = 0
    }

  }



  checkLeter(letter: string) {
    let d = document.querySelector('.choiceAria')
    let w: any = localStorage.getItem("word")

    if(letter != w[0]){
      this.bul = true
    }
    if(letter === w[0]&&this.puzzleWord !== "" ){

      let h = document.createElement('div')
      if(d){
      d.appendChild(h)

      let g = document.createElement('div')

        g.textContent = `${letter}`
        g.style.display = "flex"
        g.style.justifyContent = "center"
        g.style.alignItems = "center"
        g.style.borderRadius = "30%"
        g.style.fontSize = "xxx-large"
        g.style.border = "solid black 1px"
        g.style.width = "100px"
        g.style.height = "100px"
        g.style.margin = "5px"
        g.style.marginTop = "5%"
        g.style.marginBottom = "5%"
        g.style.transition = "0.5s"
        g.style.backgroundColor = "forestgreen"

      if (h) {
        h.appendChild(g)
        if(w.length > 1) {
          let r = w.slice(1)
          localStorage.setItem("word", r)
          this.puzzleWord = localStorage.getItem("word");

       }

        if(w.length === 1) {
          h.appendChild(g)
          let r = ""
          localStorage.setItem("word", r)
          this.puzzleWord = localStorage.getItem("word");}

      }}}
    if(this.puzzleWord === ""){
      this.n = true
    }
  }
}
