import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Navigation, NavigationExtras, Router, UrlTree} from "@angular/router";
import {AddWordsComponent} from "../../../learning/components/add-words/add-words.component";
import {UserService} from "../../../../../services/user.service";
import {IToken} from "../../../../../interfaces/token.interface";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  form: FormGroup

  token: IToken

  message: boolean = false

  constructor(private router :Router, private userService:UserService) {
  }
  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  SendAuth() {
    this.userService.logIn(this.form.getRawValue()).subscribe(value => {
      if(value) {
        localStorage.setItem("access", value.access)
        this.router.navigate(["/choice"])
      }else {
        this.message = true
      }
    })
  }
}
