import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDataP} from "../../../../../../interfaces/change-progres-body.interface";

@Component({
  selector: 'app-puzz',
  templateUrl: './puzz.component.html',
  styleUrl: './puzz.component.css'
})
export class PuzzComponent implements OnInit{

  @Input()
  bul: boolean

  @Input()
  pArr: string

  @Input()
  puzzW: string

  @Output()
  emitter: EventEmitter<any> = new EventEmitter<any>()



  pLet: IDataP

  puzzLet: string[]
  i: number

  o: IDataP
  ngOnInit(): void {

  }


  choice(puzzW: string) {
    this.emitter.emit(puzzW)


  }

}
