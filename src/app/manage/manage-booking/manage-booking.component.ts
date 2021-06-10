import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from '../../booking/shared/booking.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

enum REQUEST_TYPES {
	received = 'received',
	mybookings = 'mybookings'
}

@Component({
	selector: 'bwm-manage-booking',
	templateUrl: './manage-booking.component.html',
	styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

	myBookings: Booking[];
	requestType: string;
	requestTypes = REQUEST_TYPES;

	constructor(
		private bookingService: BookingService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.requestType = params['type'] || this.requestTypes.mybookings;
		});
	}

	getMyBookings = () => this.bookingService.getMyBookings();
	getReceivedBookings = () => this.bookingService.getReceivedBookings();
}
