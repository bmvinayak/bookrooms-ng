import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalListItemComponent } from 'src/app/rental/rental-list-item/rental-list-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations: [
		RentalListItemComponent
	],
	exports: [
		RentalListItemComponent
	],
	imports: [
		RouterModule,
		CommonModule
	]
})
export class SharedRentalModule { }
