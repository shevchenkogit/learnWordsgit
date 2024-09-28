import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/user.interface";
import {urls} from "../configs/urls";
import {Observable} from "rxjs";
import {IToken} from "../interfaces/token.interface";
import {ILogIn} from "../interfaces/log-in.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public addUser(user:IUser): Observable<IUser>{
    return this.httpClient.post<IUser>(urls.api + urls.user, user)
  }

  public getUsers(): Observable<IUser>{
    return this.httpClient.get<IUser>(urls.api + urls.user)
  }

  public logIn(data: ILogIn): Observable<IToken>{
    return this.httpClient.post<IToken>(urls.api + urls.user + urls.logIn, data)
  }

  public checkToken(token: string): Observable<any>{
    return this.httpClient.get(urls.api + urls.user + urls.check + `/${token}`)
  }

  public getUserByEmail(email: string): Observable<any>{
    return this.httpClient.get(urls.api + urls.user + urls.email + `/${email}`)
  }

}
