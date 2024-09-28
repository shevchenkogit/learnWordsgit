import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ManageWordsService} from "../../../../../services/manage-words.service";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrl: './add-words.component.css'
})
export class AddWordsComponent implements OnInit {

  form: FormGroup

  added: boolean = false

  token: any = jwtDecode(`${localStorage.getItem("access")}`)
  tokenS: string = `${localStorage.getItem("access")}`

  message: boolean = false

  constructor(private manageWordsService: ManageWordsService, private router :Router) {
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.form = new FormGroup({
      original: new FormControl(''),
      translate: new FormControl(''),
      // learnProgram: new FormControl('1'),
      // pdone: new FormControl('q'),
      user: new FormControl(`${JSON.stringify({id: this.token.jti, lp: "1", pd: "q"})}`)
    })
  }

  onSubmit() {
    if(this.form.getRawValue().original.length > 1 && this.form.getRawValue().translate.length > 1) {
      this.manageWordsService.addWords(this.form.getRawValue(), this.tokenS).subscribe()
      this.added = true
      this.message = false
      this.createForm()
    }else {
      this.message = true
    }
  }

  addMore() {
    this.added = false
  }

  backToMenu() {
    this.router.navigate(["/choice"])
  }
}
