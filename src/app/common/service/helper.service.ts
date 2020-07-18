import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from '../../booking/shared/booking.model';

@Injectable()
export class HelperService {

    public getRangeOfDates(startAt, endAt) {
        return this.getRangeOfDateswithFormat(startAt, endAt,Booking.BOOKING_DATE_FORMAT);
    }

    public getRangeOfDateswithFormat(startAt, endAt, dateFormat) {
        const bookedDates = [];
        const mEndAt = moment(endAt);
        let bookedDate = moment(startAt);
 
        while(bookedDate <= mEndAt) {
            bookedDates.push(bookedDate.format(dateFormat));
            bookedDate = bookedDate.add(1, 'day');
        }
        return bookedDates;
    }

    private formatDate(date, dateFormat){
        return moment(date).format(dateFormat);
    }

    public getFormatedDate(date){
        return this.formatDate(date, Booking.BOOKING_DATE_FORMAT);
    }
}