import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { RentalItem } from './rental.model';

@Injectable()

export class RentalService{
	
	constructor(private http: HttpClient) {}

	public getRentalById(rentalId: string): Observable<any> {
		
		return this.http.get('/api/v1/rentals/' + rentalId);
	}

	public getRentalByCity(city: string): Observable<any> {

		return this.http.get(`/api/v1/rentals?city=${city}`);
	}
	public getRentalItems(): Observable<any> {
		
		return this.http.get('/api/v1/rentals');

	}

	public createRentalItem(rental: RentalItem): Observable<any> {

		return this.http.post('/api/v1/rentals', rental);

	}
}


