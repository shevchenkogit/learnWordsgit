import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../../interfaces/words.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {ManageWordsService} from "../../../../../../services/manage-words.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-one-word-for-all',
  templateUrl: './one-word-for-all.component.html',
  styleUrl: './one-word-for-all.component.css'
})
export class OneWordForAllComponent implements OnInit{

  @Input()
  word: IWords

  form: FormGroup

  changeF: boolean = false

  tokenS: string = `${localStorage.getItem("access")}`

  @Output()
  emiter = new EventEmitter<number>()

  constructor(private manageWordsService :ManageWordsService) {
  }

  ngOnInit(): void {

  }


  change(id: number) {
    console.log(id)
    console.log(jwtDecode(this.tokenS).jti);
    this.manageWordsService.getToMylib(id, jwtDecode(this.tokenS).jti, this.tokenS).subscribe()
  }
}
