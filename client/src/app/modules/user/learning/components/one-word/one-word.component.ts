import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IWords} from "../../../../../interfaces/words.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";


@Component({
  selector: 'app-one-word',
  templateUrl: './one-word.component.html',
  styleUrl: './one-word.component.css'
})
export class OneWordComponent implements OnInit{

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
  createChange(){
    this.form = new FormGroup({
        original: new FormControl(this.word.original),
        translate: new FormControl(this.word.translate)
    }
    )
  }


  change(id: number) {
    this.createChange()
    this.changeF = !this.changeF
  }

  delete(id: number) {
    this.manageWordsService.delete(id, jwtDecode(this.tokenS).jti, this.tokenS).subscribe()
    this.emiter.emit(1)
    window.location.reload()
    // this.router.navigate(["/choice/lib"])
  }

  registr() {
    this.word.translate = this.form.getRawValue().translate
    this.word.original = this.form.getRawValue().original
    this.manageWordsService.changeWord(this.word, this.tokenS).subscribe(value => console.log(value))

  }
}
