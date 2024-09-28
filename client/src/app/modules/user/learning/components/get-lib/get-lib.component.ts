import {Component, OnInit} from '@angular/core';
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {IWords} from "../../../../../interfaces/words.interface";
import {OneWordComponent} from "../one-word/one-word.component";
import {NgForOf} from "@angular/common";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-get-lib',
  templateUrl: './get-lib.component.html',
  styleUrl: './get-lib.component.css'
})
export class GetLibComponent implements OnInit{

  words: IWords[]

  tokenS: string = `${localStorage.getItem("access")}`

  constructor(private manageWordsService:ManageWordsService, private router :Router) {
  }
  ngOnInit(): void {
    this.inet()
  }

  inet(){
    this.manageWordsService.getWordsByUserId(jwtDecode(this.tokenS).jti, this.tokenS).subscribe(value => this.words = value)
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
