import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { CImage, RentalItem } from '../shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UppercasePipe } from 'src/app/common/pipes/uppercase.pipes';
import { Subject } from 'rxjs';
import { ImageUploadService } from 'src/app/common/modules/image-upload/image-upload.service';

@Component({
	selector: 'bwm-rental-update',
	templateUrl: './rental-update.component.html',
	styleUrls: ['./rental-update.component.scss']
})

export class RentalUpdateComponent implements OnInit {

	currentRentalItem: RentalItem;
	rentalCategories = RentalItem.CATEGORIES;
	locationSubject = new Subject<string>();
	errors: BwmApi.Error[] = [];
	currentImageId: string;

	constructor(
		private currentRoute: ActivatedRoute,
		private rentalService: RentalService,
		private imageUploadService: ImageUploadService,
		private upper: UppercasePipe) {
	}

	ngOnInit() {
		this.currentRoute.params.subscribe(
			(params) => {
				this.getRentalById(params['rentalId']);
			}
		);
	}

	toUpperCase = (field: string) => {
		return this.upper.transform(field, 'firstLetterUpper');
	}

	getImageUrl = (image: CImage): string => {
		return image.url;
	}


	getBedroomAssets(asset: number): number {
		const { bedrooms } = this.currentRentalItem;
		return parseInt(bedrooms as any, 10) + asset;
	}

	get rentalLocation(): string {
		return `${this.currentRentalItem.city}, ${this.currentRentalItem.street}`;
	}

	getRentalById(rentalId: string) {
		this.rentalService.getRentalById(rentalId).subscribe(
			(rentalItem: RentalItem) => {
				this.currentRentalItem = rentalItem;
				this.currentImageId = rentalItem.image._id;
			},
			(errorResponse) => {
				this.errors = errorResponse;
			});
	}

	updateRental(rentalEventData: any) {
		const { data, notifier } = rentalEventData;
		// to update Map view
		if (data.city || data.street) {
			this.locationSubject
				.next(`${this.currentRentalItem.city}, ${this.currentRentalItem.street}`);
		}

		this.rentalService
			.updateRentalItem(this.currentRentalItem._id, data)
			.subscribe(
				(updatedrental: RentalItem) => {
					if (data.image) {
						this.imageUploadService
							.deleteImage(this.currentImageId)
							.subscribe((result) => {
							}, () => { });
					}
					this.currentRentalItem = updatedrental;
					notifier(null);
				},
				(errorResponse) => {
					notifier(errorResponse);
				});
	}
}
