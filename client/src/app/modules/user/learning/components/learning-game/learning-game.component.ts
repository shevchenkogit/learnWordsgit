import {Component, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../interfaces/words.interface";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-learning-game',
  templateUrl: './learning-game.component.html',
  styleUrl: './learning-game.component.css'
})
export class LearningGameComponent implements OnInit{

  @Output()
  words: IWords[]

  constructor(private manageWordsService:ManageWordsService, private router:Router) {
  }

  ngOnInit(): void {
  }

  backToMenu() {
    this.router.navigate(["/choice"])
  }

}
