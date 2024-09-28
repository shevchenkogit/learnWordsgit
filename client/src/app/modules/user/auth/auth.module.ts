import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {AuthComponent} from "./components/auth/auth.component";
import {LogInComponent} from "./components/log-in/log-in.component";
import {SighInComponent} from "./components/sigh-in/sigh-in.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AuthComponent,
        LogInComponent,
        SighInComponent],
    exports: [
        LogInComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
