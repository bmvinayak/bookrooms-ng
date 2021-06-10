import { Component, OnInit } from '@angular/core';
import { RentalItem } from '../shared/rental.model';
import { Router } from '@angular/router';

import { RentalService } from '../shared/rental.service';
import { validateInputs } from 'src/app/common/validators/functions';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'bwm-rental-create',
	templateUrl: './rental-create.component.html',
	styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

	newRental: RentalItem;
	rentalCategories = RentalItem.CATEGORIES;
	rentalcurrencies = RentalItem.CURRENCIES;
	errors: BwmApi.Error[] = [];

	constructor(
		private rentalService: RentalService,
		private router: Router) { }

	ngOnInit() {
		this.newRental = new RentalItem();
		this.newRental.shared = false;
		this.newRental.category = this.rentalCategories[0];
		this.newRental.currency = this.rentalcurrencies[0];
	}

	attachImageToRentalItem(imageId: string) {
		this.newRental.image._id = imageId;
	}

	get hasImageId(): boolean {
		return this.newRental.image && this.newRental.image._id ? true : false;
	}

	createRental(createRentalForm: NgForm) {
		validateInputs(createRentalForm);
		if (createRentalForm.invalid) { return; }

		this.errors = [];
		this.rentalService
			.createRentalItem(this.newRental)
			.subscribe(
				(rental: RentalItem) => {
					this.router.navigate([`/rentals/${rental._id}`]);
				},
				(errorResponse) => {
					this.errors = errorResponse;
				});
	}
}
