import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../../../../services/user.service";
import {Router} from "@angular/router";
import {IUser} from "../../../../../interfaces/user.interface";

@Component({
  selector: 'app-sigh-in',
  templateUrl: './sigh-in.component.html',
  styleUrl: './sigh-in.component.css'
})
export class SighInComponent implements OnInit{
  form: FormGroup

  user: IUser

  message: boolean = false


  constructor(private userService:UserService, private router:Router) {
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  registr() {
    this.userService.addUser(this.form.getRawValue()).subscribe(value => {
          if (value === null ){
            this.message = true
          }else {
            this.router.navigate(['/auth'])
          }
        }
    )

  }
}
