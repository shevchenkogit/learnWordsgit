import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{

  ngOnInit(): void {
    // localStorage.setItem("let", "1")
  }
  lI: boolean = true
  sI: boolean = true

  lIF() {
    this.lI = false
    this.sI = true
  }

  sIF() {
    this.lI = true
    this.sI = false
  }


}
