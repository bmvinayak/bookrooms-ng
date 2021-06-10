import { RentalItem } from '../../rental/shared/rental.model';

export class Booking {
	static readonly BOOKING_DATE_FORMAT = 'YYYY/MM/DD';
	_id: string;
	startAt: string;
	endAt: string;
	cancelByDate: string;
	dailyRate: number;
	days: number;
	noOfGuests: number;
	totalAmount: number;
	currency: string;
	createdAt: string;
	user: any;
	rentalItem: RentalItem;

}