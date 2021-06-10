import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/booking/shared/booking.model';
import { BookingService } from 'src/app/booking/shared/booking.service';

@Component({
	selector: 'bwm-booking-listing',
	templateUrl: './booking-listing.component.html',
	styleUrls: ['./booking-listing.component.scss']
})
export class BookingListingComponent implements OnInit {

	@Input('title') title: string;
	@Input('getBookings') getBookings: () => Observable<Booking[]>;

	bookings: Booking[];
	bookingDeleteIndex: number;
	errors: any[] = [];

	constructor(
		private bookingService: BookingService,
		private toastrService: ToastrService) { }

	ngOnInit() {
		this.getBookings()
			.subscribe((bookings) => {
				this.bookings = bookings;
			});
	}

	deleteBooking(bookingId: string) {
		const bookingObserable = this.bookingService.deleteBooking(bookingId);
		bookingObserable.subscribe(
			() => {
				this.bookings.splice(this.bookingDeleteIndex, 1);
				this.bookingDeleteIndex = undefined;
				this.toastrService.success(
					'Your Rental has been deleted.',
					'Success',
					{
						closeButton: true,
					});
			},
			(errorResponse) => {
				this.errors = errorResponse;
				this.bookingDeleteIndex = undefined;
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