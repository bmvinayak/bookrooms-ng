import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { RentalItem} from '../shared/rental.model';



@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  currentRentalItem: RentalItem;
  errors: any[] = [];
  errorResponse: any = "";
  constructor(private currentRoute: ActivatedRoute,
  			  private rentalService: RentalService) { 
  }

  ngOnInit() {

  	this.currentRoute.params.subscribe(
  		(params) => {
  			this.getRentalById(params['rentalId']);
			}
	);
  }

  getRentalById(rentalId: string) {
  	this.rentalService.getRentalById(rentalId).subscribe(
  		(rentalItem: RentalItem)=> {
        this.currentRentalItem = rentalItem;	
      },
      (errorResponse) => {
        this.errorResponse = errorResponse;
        this.errors = errorResponse.error.errors;
      });
  }
}
