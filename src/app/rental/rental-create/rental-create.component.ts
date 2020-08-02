import { Component, OnInit } from '@angular/core';
import { RentalItem } from '../shared/rental.model';
import { Router } from '@angular/router';

import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: RentalItem;
  rentalCategories = RentalItem.CATEGORIES;
  rentalcurrencies = RentalItem.CURRENCIES;
  errors: any[] = [];

  constructor(private rentalService: RentalService,
              private router: Router) { }

  handleImageChange() {
    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg"
  }

  ngOnInit() {
    this.newRental = new RentalItem();
    this.newRental.shared = false;
    this.newRental.currency = this.rentalcurrencies[0];
  }

  createRental() {
    const rentalServiceObserable = this.rentalService.createRentalItem(this.newRental);
    rentalServiceObserable.subscribe(
      (rental: RentalItem) => {
        this.router.navigate([`/rentals/${rental._id}`])
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      })
  }
}
