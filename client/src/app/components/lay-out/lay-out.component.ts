import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-lay-out',
  templateUrl: './lay-out.component.html',
  styleUrl: './lay-out.component.css'
})
export class LayOutComponent implements OnInit{

  ngOnInit(): void {
    // localStorage.setItem("let", "0")
  }


  protected readonly RouterOutlet = RouterOutlet;
}
