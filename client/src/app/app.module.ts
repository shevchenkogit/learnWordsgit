import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./components/app.component";
import {BrowserModule} from "@angular/platform-browser";
import {LayOutComponent} from "./components/lay-out/lay-out.component";
import {HeadersComponent} from "./components/headers/headers.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    LayOutComponent,
    HeadersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers:[],
  bootstrap:[AppComponent]

})
export class AppModule { }
