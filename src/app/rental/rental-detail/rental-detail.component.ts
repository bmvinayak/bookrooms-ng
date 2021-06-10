import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { RentalItem } from '../shared/rental.model';
// import { HttpErrorResponse } from '@angular/common/http';



@Component({
	selector: 'bwm-rental-detail',
	templateUrl: './rental-detail.component.html',
	styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

	currentRentalItem: RentalItem;
	errors: BwmApi.Error[] = [];
	// errorResponse: any = "";
	accessMessage: string;
	constructor(
		private currentRoute: ActivatedRoute,
		private rentalService: RentalService) {
	}

	ngOnInit() {

		this.currentRoute.params.subscribe(
			(params) => {
				// TODO: May need to remove this queryParams after settimeout
				this.getRentalById(params['rentalId']);
				if (params['Access'] === 'NotOwner') {
					this.accessMessage = 'You cannot edit this Rental as you are not the owner!!!';
				}
			}
		);
	}

	get rentalLocation(): string {
		return `${this.currentRentalItem.city}, ${this.currentRentalItem.street}`;
	}

	getRentalById(rentalId: string) {
		this.rentalService.getRentalById(rentalId).subscribe(

			(rentalItem: RentalItem) => {
				this.currentRentalItem = rentalItem;
			},
			(errorResponse) => {
				this.errors = errorResponse;
			});
	}
}
