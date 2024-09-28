import {Component, Input, OnInit} from '@angular/core';
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {IWords} from "../../../../../interfaces/words.interface";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-cads',
  templateUrl: './cads.component.html',
  styleUrl: './cads.component.css'
})
export class CadsComponent implements OnInit{


  words: IWords[]
  word: number = 0
  random: number = 0
  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`
      // = (): number { return Math.floor(Math.random() * 8)}

  constructor(private manageWordsService:ManageWordsService) {
  }

  ngOnInit(): void {
    this.manageWordsService.getNewWords("m", this.token.jti, this.tokenS).subscribe(value => {
      this.words = value.slice(0, 5)})
      // this.generateRandom(3)
  }

  private generateRandom (x:number){
    this.random = Math.floor(Math.random() * x)
  }
  protected readonly onclick = onclick;

  onClick() {
    this.random = this.random + 1
    if (this.random === this.words.length-1){
      this.random = 0
    }
  }
}
