import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RentalItem } from './rental.model';
import { catchError } from 'rxjs/operators';
import { exctractApiError } from 'src/app/common/helpers/functions';

@Injectable({
	providedIn: 'root'
})
export class RentalService {

	constructor(private http: HttpClient) { }

	public getRentalById(rentalId: string): Observable<any> {
		return this.http.get('/api/v1/rentals/' + rentalId);
	}

	public getRentalByCity(city: string): Observable<any> {
		return this.http.get(`/api/v1/rentals?city=${city}`);
	}

	public getMyRentalItems(): Observable<any> {
		return this.http.get('/api/v1/rentals/myrentals');
	}

	public getRentalItems(): Observable<any> {
		return this.http.get('/api/v1/rentals');
	}

	public verifyUserIsOwner(rentalId: string): Observable<any> {
		return this.http.get(`/api/v1/rentals/${rentalId}/verify-user-is-owner`);
	}

	public createRentalItem(rental: RentalItem): Observable<any> {
		return this.http.post('/api/v1/rentals', rental)
			.pipe(
				catchError(
					(resError: HttpErrorResponse) => throwError(exctractApiError(resError)))
			);
	}

	public deleteRentalItem(rentalId: string): Observable<any> {
		return this.http.delete('/api/v1/rentals/' + rentalId);
	}

	public updateRentalItem(rentalId: string, rentalData: any): Observable<RentalItem> {
		return this.http.patch<RentalItem>(`/api/v1/rentals/${rentalId}`, rentalData);
	}
}


