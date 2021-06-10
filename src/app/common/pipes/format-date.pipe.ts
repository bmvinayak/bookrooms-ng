import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
	transform(date: string, dateFormat = 'YYYY/MM/DD'): string {
		if (!date || typeof date !== 'string') { return ''; }
		return moment(date).format(dateFormat);
	}
}