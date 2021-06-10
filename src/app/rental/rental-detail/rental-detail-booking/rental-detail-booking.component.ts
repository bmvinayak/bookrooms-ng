import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { RentalItem } from '../../shared/rental.model';
import { BookingService } from '../../../booking/shared/booking.service';
import { AuthService } from '../../../auth/shared/auth.service';
import { Moment } from 'moment';


@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'bwm-rental-detail-booking',
	templateUrl: './rental-detail-booking.component.html',
	styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

	@Input() rental: RentalItem;
	bookingDateFormat = Booking.BOOKING_DATE_FORMAT;
	selectedDates: { startDate: Moment, endDate: Moment };
	@ViewChild(DaterangePickerComponent, { static: false }) private picker: DaterangePickerComponent;
	newBooking: Booking;
	daterange: any = {};
	allbookedDates: string[] = [];
	errors: BwmApi.Error[] = [];
	modelRef: any;

	// can also be setup using the config service to apply to multiple pickers
	options: any = {
		locale: { format: Booking.BOOKING_DATE_FORMAT },
		alwaysShowCalendars: false,
		autoUpdateInput: true,
		autoApply: true,
		opens: 'left',
		isInvalidDate: this.checkIfDateUnavailable.bind(this)
	};

	constructor(
		public helperService: HelperService,
		private modalService: NgbModal,
		private bookingService: BookingService,
		private toastrService: ToastrService,
		public authService: AuthService,
		private router: Router) { }

	ngOnInit() {
		this.getBookedDates();
		this.newBooking = new Booking();
		this.newBooking.noOfGuests = 1;

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
				this.resetDatePicker();
				this.toastrService.success(
					'Your booking was successfully created. Check your booking in Manage Section.',
					'Success',
					{
						closeButton: true,
					});
			},
			(errorResponse) => {
				this.errors = errorResponse;
			});
	}

	public checkIfDateUnavailable(date): boolean {
		return this.allbookedDates.includes(date.format())
			|| this.helperService.isDateInPast(date);

	}

	private getBookedDates() {
		this.bookingService
			.getBookings(this.rental._id)
			.subscribe(bookings => {
				if (bookings && bookings.length > 0) {
					bookings.forEach((booking: Booking) => {
						const bookedDates = this.helperService.getRangeOfDates(booking.startAt, booking.endAt);
						this.allbookedDates.push(...bookedDates);
					});
				}
			});
	}

	private addNewBookingDates(bookingData: any) {
		const bookedDates = this.helperService.getRangeOfDates(bookingData.startAt, bookingData.endAt);
		this.allbookedDates.push(...bookedDates);
	}

	private resetDatePicker() {
		this.picker.datePicker.setStartDate(moment());
		this.picker.datePicker.setEndDate(moment());
		this.picker.datePicker.element.val('');
	}

	openConfirmModal(content) {
		this.errors = [];
		const cancelByDate = moment(this.newBooking.startAt, this.bookingDateFormat).subtract(this.rental.cancelBeforeDays, 'days');
		this.newBooking.dailyRate = this.rental.dailyRate;
		this.newBooking.currency = this.rental.currency;
		this.newBooking.totalAmount = this.newBooking.days * this.newBooking.dailyRate;
		this.newBooking.cancelByDate = cancelByDate.format(this.bookingDateFormat);
		// No of Guests in the UI is bound to newBooking.noOfGuests so no need to separate fetch it
		this.newBooking.rentalItem = { ...this.rental };
		this.modelRef = this.modalService.open(content);
	}

	public selectedDate(value: any, datepicker?: any) {
		const startDate = value.start;
		const endDate = value.end;
		this.newBooking.startAt = startDate.format(this.bookingDateFormat);
		this.newBooking.endAt = endDate.format(this.bookingDateFormat);
		this.picker.datePicker.element.val(this.newBooking.startAt + ' - ' + this.newBooking.endAt);
		// if start date and end date is same then booking is considered for one day
		this.newBooking.days = endDate.diff(startDate, 'days') + 1;
	}

	get canOpenConfirmation() {
		return this.newBooking.startAt &&
			this.newBooking.endAt &&
			this.newBooking.noOfGuests &&
			this.newBooking.noOfGuests > 0;
	}


	public redirectToLogin() {
		this.authService.redirectUrl = `rentals/${this.rental._id}`;
		this.router.navigate(['/login']);

	}
}
