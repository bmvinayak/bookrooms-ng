import { Booking } from '../../booking/shared/booking.model';

export class RentalItem {

    static readonly CATEGORIES = ['house', 'apartment', 'condo'];
    static readonly CURRENCIES = ['USD', 'EUR', 'INR'];

	_id: string;
	title: string;
    city: string;
    street: string;
    category: string;
    image: string;
    bedrooms: number;
    description: string;
    dailyRate: number;
    currency: string;
    shared: boolean;
    createdAt: string;
    user: any;
    bookings: Booking[];
}
