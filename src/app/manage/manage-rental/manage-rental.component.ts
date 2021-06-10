import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

import { RentalService } from '../../rental/shared/rental.service';
import { RentalItem } from '../../rental/shared/rental.model';

@Component({
	selector: 'bwm-manage-rental',
	templateUrl: './manage-rental.component.html',
	styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

	myRentalItems: RentalItem[];
	rentalDeleteIndex: number;
	errors: BwmApi.Error[] = [];

	constructor(
		private rentalService: RentalService,
		private toastrService: ToastrService) { }

	ngOnInit() {
		const rentalObserable = this.rentalService.getMyRentalItems();
		rentalObserable.subscribe(
			(rentalItemsFromService: RentalItem[]) => {
				this.myRentalItems = rentalItemsFromService;
			},
			(errorResponse: HttpErrorResponse) => {
			},
			() => {
			});
	}

	deleteRentalItem(rentalItemId: string) {
		const rentalObserable = this.rentalService.deleteRentalItem(rentalItemId);
		rentalObserable.subscribe(
			() => {
				this.myRentalItems.splice(this.rentalDeleteIndex, 1);
				this.rentalDeleteIndex = undefined;
				this.toastrService.success(
					'Your Rental has been deleted.',
					'Success',
					{
						closeButton: true,
					});
			},
			(errorResponse) => {
				this.errors = errorResponse;
				this.rentalDeleteIndex = undefined;
				this.toastrService.error(
					this.errors[0].title + ': ' + this.errors[0].detail,
					'Error',
					{
						closeButton: true,
					});
			},
			() => {
			});
	}

}
