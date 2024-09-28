import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.css'
})
export class ChoiceComponent implements OnInit{

  auth: boolean = false

  token: string = `${localStorage.getItem("access")}`


  constructor(private userService :UserService, private router: Router) {
  }


  ngOnInit(): void {
    this.checkToken()
  }
  checkToken(){
    this.userService.checkToken(this.token).subscribe(value => {

      this.auth = value
      }
    )
  }

  goAuth() {
    this.router.navigate(['/auth/logIn'])
  }

  backToMenu() {
    localStorage.removeItem("access")
    this.router.navigate(["/"])
  }
}
