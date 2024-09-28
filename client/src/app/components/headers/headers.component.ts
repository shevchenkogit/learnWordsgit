import {Component, ErrorHandler, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit{

  tokenS: string = `${localStorage.getItem("access")}`

  constructor(private router:Router, private userService: UserService) {


  }
  ngOnInit(): void {
  }


  nav() {
    this.tokenS = `${localStorage.getItem("access")}`

      this.userService.checkToken(this.tokenS).subscribe(value => {
        if(value){
          this.router.navigate(['/choice'])
        }
        if(!value){
          this.router.navigate(['/auth'])
        }
      })
  }
}
