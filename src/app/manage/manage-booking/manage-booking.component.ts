import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from '../../booking/shared/booking.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  myBookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    const bookingObserable = this.bookingService.getUserBookings();
    bookingObserable.subscribe(
      (bookingsFromService: Booking[]) => {
        this.myBookings = bookingsFromService;
      },
      (errorResponse: HttpErrorResponse) => {
      },
      () => {
      })
  }
}
