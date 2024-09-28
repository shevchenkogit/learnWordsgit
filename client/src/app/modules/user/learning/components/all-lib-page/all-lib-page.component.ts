import {Component, OnInit} from '@angular/core';
import {IWords} from "../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {jwtDecode} from "jwt-decode";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-all-lib-page',
  templateUrl: './all-lib-page.component.html',
  styleUrl: './all-lib-page.component.css'
})
export class AllLibPageComponent implements OnInit{
  words: IWords[]

  tokenS: string = `${localStorage.getItem("access")}`



  constructor(private manageWordsService:ManageWordsService, private router:Router) {
  }
  ngOnInit(): void {
    this.inet()
  }

  inet(){
    this.manageWordsService.getWords(this.tokenS).subscribe(value => this.words = value)
  }

  emitF(g: any){
    if(g===1){
      this.inet()
    }
  }

  backToMenu() {
    this.router.navigate(["/choice"])
  }
}
