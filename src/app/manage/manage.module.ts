import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from '../app-routing.module';
import { ManageComponent } from './manage.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';

import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { FormatDatePipe } from '../common/pipes/format-date.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';

@NgModule({
  declarations: [
    ManageComponent, 
    ManageRentalComponent, 
    ManageBookingComponent, 
    FormatDatePipe, ManageRentalBookingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgPipesModule
  ],
  providers: [
    RentalService,
    BookingService,
    AuthGuard
  ]
})
export class ManageModule { }
