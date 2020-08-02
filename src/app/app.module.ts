import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageModule } from './manage/manage.module';


import { RentalModule } from './rental/rental.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    RentalModule, 
    AuthModule,
    ManageModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
