import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Booking } from './booking.model';


// import 'rxjs/Rx';
import { catchError, map } from 'rxjs/operators';
import { exctractApiError } from 'src/app/common/helpers/functions';

@Injectable({
	providedIn: 'root'
})
export class BookingService {

	constructor(private http: HttpClient) { }

	public getMyBookings(): Observable<any> {
		return this.http.get('/api/v1/bookings/mybookings');
	}

	public getReceivedBookings(): Observable<Booking[]> {
		return this.http.get<Booking[]>(`/api/v1/bookings/received`);
	}

	public getBookings(rentalId: string): Observable<Booking[]> {
		return this.http.get<Booking[]>(`/api/v1/bookings?rentalItem=${rentalId}`);
	}
	public createBooking(booking: Booking): Observable<Booking> {
		return this.http
			.post<Booking>('/api/v1/bookings', booking)
			.pipe(catchError((resError: HttpErrorResponse) => throwError(exctractApiError(resError))));
	}

	public deleteBooking(bookingId: string): Observable<any> {
		return this.http.delete('/api/v1/bookings/' + bookingId);
	}
}
