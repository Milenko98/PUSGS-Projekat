import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPrijavaComponent } from './header-prijava/header-prijava.component';
import { BodyPrijavaComponent } from './body-prijava/body-prijava.component';
import { LoginPrijavaComponent } from './login-prijava/login-prijava.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPrijavaComponent,
    BodyPrijavaComponent,
    LoginPrijavaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
