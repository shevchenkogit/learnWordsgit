import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IWords} from "../interfaces/words.interface";
import {urls} from "../configs/urls";
import {Observable} from "rxjs";
import {IDataP} from "../interfaces/change-progres-body.interface";


@Injectable({
  providedIn: 'root'
})
export class ManageWordsService {

  constructor(private httpClient:HttpClient) { }

  addWords(data: any, token: string):Observable<any>{
      return this.httpClient.post(urls.api + urls.words + `/${token}`, data)
  }
  getWords(token: string):Observable<any[]>{
    return this.httpClient.get<any[]>(urls.api + urls.words + `/${token}`)
  }

  getNewWords(t:string, id:string, token: string):Observable<any[]>{
    return this.httpClient.get<any[]>(urls.api + urls.words + urls.learnWords + `/${t}/${id}/${token}` )
  }

  changeProgressLevel(data: IDataP, token: string):Observable<any[]>{
    return this.httpClient.put<any[]>(urls.api + urls.words + urls.learnWords + `/${token}`, data )

  }
  changeWord(data: any, token: string):Observable<any[]>{
    return this.httpClient.post<any[]>(urls.api + urls.words + urls.change + `/${token}`, data)
  }

  delete(id: number, uId: any, token: string):Observable<void>{
    return this.httpClient.delete<void>(urls.api + urls.words + urls.delete + `/${id}/${uId}/${token}`)
  }

  getWordsByUserId(id: any, token: string):Observable<any[]>{
    return this.httpClient.get<any[]>(urls.api + urls.words + urls.user + `/${id}/${token}`)
  }

  getToMylib(id: any, uId: any, token: string): Observable<void>{
    return this.httpClient.get<void>(urls.api + urls.words + urls.user + '/get' + `/${id}/${uId}/${token}`)
  }

}
