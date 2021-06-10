import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NgPipesModule } from 'ngx-pipes';

import { ManageComponent } from './manage.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';
import { FormatDatePipe } from '../common/pipes/format-date.pipe';

import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { AuthGuard } from '../auth/shared/auth.guard';
import { SharedRentalModule } from '../common/modules/shared-rental.module';
import { BookingListingComponent } from './components/booking-listing/booking-listing.component';


@NgModule({
	declarations: [
		ManageComponent,
		ManageRentalComponent,
		ManageBookingComponent,
		ManageRentalBookingComponent,
		BookingListingComponent,
		FormatDatePipe
	],
	imports: [
		CommonModule,
		AppRoutingModule,
		NgPipesModule,
		SharedRentalModule
	],
	providers: [
		RentalService,
		BookingService,
		AuthGuard
	]
})
export class ManageModule { }
