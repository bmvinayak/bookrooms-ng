import { Booking } from '../../booking/shared/booking.model';

export class RentalItem {
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
    bookings: Booking[];
}
