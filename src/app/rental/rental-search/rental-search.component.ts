import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { RentalItem } from '../shared/rental.model';



@Component({
	selector: 'bwm-rental-search',
	templateUrl: './rental-search.component.html',
	styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

	errors: BwmApi.Error[] = [];
	rentalItems: RentalItem[] = [];
	searchTerm = '';
	constructor(
		private currentRoute: ActivatedRoute,
		private rentalService: RentalService) {
	}

	ngOnInit() {

		this.currentRoute.paramMap.subscribe(
			(params: ParamMap) => {
				this.searchTerm = params.get('city');
				this.getRentalByCity(this.searchTerm);
			}
		);
	}

	getRentalByCity(city: string) {
		this.errors = [];
		this.rentalItems = [];

		this.rentalService.getRentalByCity(city).subscribe(
			(rentalItemsFromService: RentalItem[]) => {
				this.rentalItems = rentalItemsFromService;
			},
			(errorResponse) => {
				this.errors = errorResponse;
			},
			() => {
			});
	}

}
