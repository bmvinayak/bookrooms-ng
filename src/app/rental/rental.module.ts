import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/modules/map/map.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '../common/modules/editable/editable.module';
import { SharedRentalModule } from '../common/modules/shared-rental.module';

import { HelperService } from '../common/service/helper.service';
import { FirstUpperLetterPipe, UppercasePipe } from '../common/pipes/uppercase.pipes';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental-update/rental-update.component';
import { ImageUploadModule } from '../common/modules/image-upload/image-upload.module';

@NgModule({
	declarations: [
		RentalListComponent,
		RentalComponent,
		RentalDetailComponent,
		UppercasePipe,
		FirstUpperLetterPipe,
		RentalDetailBookingComponent,
		RentalSearchComponent,
		RentalCreateComponent,
		RentalUpdateComponent,
	],
	imports: [
		CommonModule,
		ImageUploadModule,
		AppRoutingModule,
		NgPipesModule,
		MapModule,
		NgxDaterangepickerMd.forRoot(),
		FormsModule,
		EditableModule,
		SharedRentalModule,
	],
	providers: [HelperService],
})
export class RentalModule {}
