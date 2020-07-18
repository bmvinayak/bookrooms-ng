import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { RentalItem } from '../../shared/rental.model';
import { BookingService } from '../../../booking/shared/booking.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  
  @Input() Rental: RentalItem;
  @ViewChild(DaterangePickerComponent, {static: false }) private picker: DaterangePickerComponent;
  newBooking: Booking;
  daterange: any = {};
  allbookedDates: any[] = [];
  errors: any[] = [];
  modelRef: any;
  
  // can also be setup using the config service to apply to multiple pickers
  options: any = {
    locale: { format: Booking.BOOKING_DATE_FORMAT },
    alwaysShowCalendars: false,
    autoUpdateInput: false,
    opens: 'left',
    isInvalidDate: this.checkForInvalidDate.bind(this)
  };
  
  constructor(private helper: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.getBookedDates();
    this.newBooking = new Booking();
    
  }

  private checkForInvalidDate(date){
    return this.allbookedDates.includes(this.helper.getFormatedDate(date)) || date.diff(moment(), 'days')<0;
  }

  private getBookedDates() {
    const bookings: Booking[] = this.Rental.bookings;
    if (bookings && bookings.length>0) {
      bookings.forEach((booking: Booking) => {
        const bookedDates =this.helper.getRangeOfDates(booking.startAt, booking.endAt);
        this.allbookedDates.push(...bookedDates);
      })
    }
  }

  private addNewBookingDates(bookingData: any) {
    const bookedDates = this.helper.getRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.allbookedDates.push(...bookedDates);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content){
    this.errors = [];
    this.newBooking.dailyRate = this.Rental.dailyRate;
    this.newBooking.currency = this.Rental.currency;
    this.newBooking.totalAmount = this.newBooking.days * this.newBooking.dailyRate;
    // No of Guests in the UI is bound to newBooking.noOfGuests so no need to separate fetch it 
    this.newBooking.rentalItem = this.Rental;
    this.modelRef = this.modalService.open(content);
  }

  createBooking() {
    const bookingServiceObserable = this.bookingService.createBooking(this.newBooking);
    bookingServiceObserable.subscribe(
      (bookingResponse: any) => {
        this.addNewBookingDates(bookingResponse);
        this.newBooking = new Booking();
        this.modelRef.close();
        this.resetDatePicker();
        this.toastrService.success('Your booking was successfully created. Check your booking in Manage Section.', 'Success');
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
        console.log("Status:" + errorResponse.status + " Errors:" + this.errors[0].title);
      })
  }
  public selectedDate(value: any, datepicker?: any) {
    this.newBooking.startAt = this.helper.getFormatedDate(value.start);
    this.newBooking.endAt = this.helper.getFormatedDate(value.end);
    this.picker.datePicker.element.val(this.newBooking.startAt + ' - ' + this.newBooking.endAt);
    //if start date and end date is same then booking is considered for one day
    this.newBooking.days = value.end.diff(value.start, 'days')+1;

  }
}
