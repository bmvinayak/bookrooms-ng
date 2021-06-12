import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Router } from '@angular/router';

import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { RentalItem } from '../../shared/rental.model';
import { BookingService } from '../../../booking/shared/booking.service';
import { AuthService } from '../../../auth/shared/auth.service';
import dayjs, { Dayjs } from 'dayjs';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'bwm-rental-detail-booking',
	templateUrl: './rental-detail-booking.component.html',
	styleUrls: ['./rental-detail-booking.component.scss'],
})
export class RentalDetailBookingComponent implements OnInit {
	@Input() rental: RentalItem;
	bookingDateFormat = Booking.BOOKING_DATE_FORMAT;
	selectedDates: { startDate: Dayjs; endDate: Dayjs };
	locale = {
		format: Booking.BOOKING_DATE_FORMAT,
	};
	todayDate = dayjs();
	newBooking: Booking;
	allbookedDates: string[] = [];
	errors: BwmApi.Error[] = [];
	modelRef: any;

	constructor(
		public helperService: HelperService,
		private modalService: NgbModal,
		private bookingService: BookingService,
		private toastrService: ToastrService,
		public authService: AuthService,
		private router: Router
	) {}

	ngOnInit() {
		this.getAllBookedDates();
		this.newBooking = new Booking();
		this.newBooking.noOfGuests = 1;
	}

	private getAllBookedDates() {
		this.bookingService.getBookings(this.rental._id).subscribe((bookings) => {
			if (bookings && bookings.length > 0) {
				bookings.forEach((booking: Booking) => {
					const bookedDates = this.helperService.getRangeOfDates(
						booking.startAt,
						booking.endAt
					);
					this.allbookedDates.push(...bookedDates);
				});
			}
		});
	}

	public checkIfDateUnavailable = (date: Moment): boolean => {
		return this.allbookedDates.includes(date.format()) || this.helperService.isDateInPast(date);
	};

	get canOpenConfirmation() {
		return (
			this.newBooking.startAt &&
			this.newBooking.endAt &&
			this.newBooking.noOfGuests &&
			this.newBooking.noOfGuests > 0
		);
	}

	public datesApplied(): void {
		debugger;
		if (!this.selectedDates.startDate || !this.selectedDates.endDate) {
			return;
		}
		this.newBooking.startAt = this.selectedDates.startDate.format(this.bookingDateFormat);
		this.newBooking.endAt = this.selectedDates.endDate.format(this.bookingDateFormat);
		this.newBooking.days =
			this.selectedDates.endDate.diff(this.selectedDates.startDate, 'days') + 1;
	}

	openConfirmModal(content) {
		this.errors = [];
		const cancelByDate = moment(this.newBooking.startAt, this.bookingDateFormat).subtract(
			this.rental.cancelBeforeDays,
			'days'
		);
		this.newBooking.dailyRate = this.rental.dailyRate;
		this.newBooking.currency = this.rental.currency;
		this.newBooking.totalAmount = this.newBooking.days * this.newBooking.dailyRate;
		this.newBooking.cancelByDate = cancelByDate.format(this.bookingDateFormat);
		this.newBooking.rentalItem = { ...this.rental };
		this.modelRef = this.modalService.open(content);
	}

	createBooking() {
		this.errors = [];
		const bookingServiceObserable = this.bookingService.createBooking(this.newBooking);
		bookingServiceObserable.subscribe(
			(bookingResponse: any) => {
				this.addNewBookingDates(bookingResponse);
				this.newBooking = new Booking();
				this.newBooking.noOfGuests = 1;
				this.selectedDates = null;
				this.modelRef.close();
				this.toastrService.success(
					'Your booking was successfully created. Check your booking in Manage Section.',
					'Success',
					{
						closeButton: true,
					}
				);
			},
			(errorResponse) => {
				this.errors = errorResponse;
			}
		);
	}

	private addNewBookingDates(bookingData: any) {
		const bookedDates = this.helperService.getRangeOfDates(
			bookingData.startAt,
			bookingData.endAt
		);
		this.allbookedDates.push(...bookedDates);
	}

	public redirectToLogin() {
		this.authService.redirectUrl = `rentals/${this.rental._id}`;
		this.router.navigate(['/login']);
	}
}
