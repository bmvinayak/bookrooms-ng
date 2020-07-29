import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { NgPipesModule} from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

import { RentalService } from './shared/rental.service';
import { HelperService } from '../common/service/helper.service';
import { BookingService } from '../booking/shared/booking.service';
import { UppercasePipe } from '../common/pipes/uppercase.pipes';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';

@NgModule({
	declarations: [
	   	RentalListComponent,
    	RentalListItemComponent,
    	RentalComponent,
		RentalDetailComponent,
		UppercasePipe,
		RentalDetailBookingComponent,
		RentalSearchComponent,
		RentalCreateComponent
    ],
	imports: [
		CommonModule, 
		AppRoutingModule,
		HttpClientModule,
		NgPipesModule,
		MapModule,
		Daterangepicker,
		FormsModule
	],
	providers: [
		RentalService,
		BookingService, 
		HelperService]
})

export class RentalModule {}