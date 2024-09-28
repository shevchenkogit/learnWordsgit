import {Component, OnInit} from '@angular/core';
import {IWords} from "../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {IDataP} from "../../../../../interfaces/change-progres-body.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-writer-to',
  templateUrl: './writer-to.component.html',
  styleUrl: './writer-to.component.css'
})
export class WriterTOComponent implements OnInit{



  n: boolean = false
  one: number = 0
  newWords: IWords[]
  t: string = "w"
  form: FormGroup
  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`


  constructor(private manageWordsService:ManageWordsService) {
  }

  ngOnInit(): void {

    this.manageWordsService.getNewWords("w", this.token.jti, this.tokenS).subscribe(value => {
      this.newWords = value.slice(0, 5)

    })

    this.initForm()

  }

  public initForm(){
    this.form = new FormGroup({
      word: new FormControl('')
    })
  }

  public generateRandom(x: number): void {
    this.one = Math.floor(Math.random() * x)
  }

  getNewWords():void {
    this.manageWordsService.getNewWords(this.t, this.token.jti, this.tokenS).subscribe(value => {
      this.newWords = value.slice(0, 5)
    })
  }


  next() {

    let body: IDataP = {w: this.t, idW: this.newWords[this.one].id, idU: this.token.jti}
    this.manageWordsService.changeProgressLevel(body, this.tokenS).subscribe()

    this.getNewWords()
    this.initForm()
    this.one = this.one + 1
    if (this.one === this.newWords.length){
      this.one = 0
    }
    this.n = false

  }


  onSubmit() {
    if(this.form.getRawValue().word === this.newWords[this.one].original){
      this.n = true
    }
  }
}
