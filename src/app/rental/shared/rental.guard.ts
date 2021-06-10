import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RentalService } from 'src/app/rental/shared/rental.service';

@Injectable({
	providedIn: 'root',
})
export class RentalGuard implements CanActivate {

	url: string;

	constructor(
		private rentalService: RentalService,
		private router: Router) { }



	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> {

		const { rentalId } = route.params;

		return this.rentalService
			.verifyUserIsOwner(rentalId)
			.pipe(
				map(_ => true),
				catchError(_ => {
					this.router.navigate(
						[`rentals/${rentalId}`],
						{ queryParams: { Access: 'NotOwner' } });
					return observableOf(false);
				}));

	}



}

