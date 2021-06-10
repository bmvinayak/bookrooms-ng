import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class HelperService {

	public getFormatedRangeOfDates(startAt, endAt, dateFormat) {
		const rangeOfDates = [];
		const mEndAt = moment(endAt);
		let givenDate = moment(startAt);

		while (givenDate <= mEndAt) {
			rangeOfDates.push(givenDate.format(dateFormat));
			givenDate = givenDate.add(1, 'day');
		}
		return rangeOfDates;
	}

	public getRangeOfDates(startAt: string, endAt: string): string[] {
		const rangeOfDates = [];
		const mEndAt = moment(new Date(endAt));
		let givenDate = moment(new Date(startAt));

		while (givenDate <= mEndAt) {
			rangeOfDates.push(givenDate.format());
			givenDate = givenDate.add(1, 'day');
		}
		return rangeOfDates;
	}
	public getFormatedDate(date, dateFormat) {
		if (!date) { return ''; }
		return moment(date, dateFormat);
	}

	isDateInPast(date: moment.Moment): boolean {
		return date.diff(moment(), 'days') < 0;
	}
}
