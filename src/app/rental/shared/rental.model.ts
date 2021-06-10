import { Booking } from '../../booking/shared/booking.model';

export class CImage {
	_id: string;
	url: string;
	cloudinaryId: string;
}

export class RentalItem {

	static readonly CATEGORIES = ['house', 'apartment', 'condo'];
	static readonly CURRENCIES = ['USD', 'EUR', 'INR'];

	_id: string;
	title: string;
	city: string;
	street: string;
	category: string;
	bedrooms: number;
	description: string;
	dailyRate: number;
	currency: string;
	shared: boolean;
	cancelBeforeDays: number;
	createdAt: string;
	image = new CImage();
	owner: any;
	bookings: Booking[];
}
