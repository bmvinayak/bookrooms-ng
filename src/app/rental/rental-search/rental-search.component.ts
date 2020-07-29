import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { RentalItem } from '../shared/rental.model';

import { HttpErrorResponse} from '@angular/common/http';



@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {
  
  errors: any[] = [];
  errorResponse: any = "";
  rentalItems: RentalItem[] = [];
  searchTerm: string ="";
  constructor(private currentRoute: ActivatedRoute,
              private rentalService: RentalService) {
  }

  ngOnInit() {

    this.currentRoute.params.subscribe(
      (params) => {
        this.searchTerm = params['city'];
        this.getRentalByCity(this.searchTerm);
      }
    );
  }

  getRentalByCity(city: string) {
    this.errorResponse = "";
    this.errors =[];
    this.rentalItems = [];
    
    this.rentalService.getRentalByCity(city).subscribe(
      (rentalItemsFromService: RentalItem[]) => {
        this.rentalItems = rentalItemsFromService;
      },
      (errorResponse: HttpErrorResponse) => {
        this.errorResponse = errorResponse;
        this.errors = errorResponse.error.errors;
      },
      () => {
      });
  }

}
