import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { RentalModule } from './rental/rental.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, RentalModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
