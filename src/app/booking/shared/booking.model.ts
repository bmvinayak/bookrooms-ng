import { RentalItem } from '../../rental/shared/rental.model';

export class Booking {
    static readonly BOOKING_DATE_FORMAT = 'YYYY/MM/DD';
    _id: string;
    startAt: string;
    endAt: string;
    dailyRate: number;
    noOfGuests: number;
    days: number;
    totalAmount: number;
    currency: string;
    createdAt: string;
    rentalItem: RentalItem;
}