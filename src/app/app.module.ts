import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {LoginComponent} from './auth/components/login/login.component';
import {SignupComponent} from './auth/components/signup/signup.component';
import {DemoAngularMaterailModule} from './DemoAngularMaterialModule';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './modules/common/home/home.component';
import {AppComponent} from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DemoAngularMaterailModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
