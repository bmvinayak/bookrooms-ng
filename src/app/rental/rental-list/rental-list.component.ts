import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import {RentalItem} from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentalItems: RentalItem[] = [];
  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    const rentalObserable = this.rentalService.getRentalItems();
   	rentalObserable.subscribe(
   		(rentalItemsFromService: RentalItem[]) =>{
   			this.rentalItems = rentalItemsFromService;
   		},
   		(err) =>{
   		},
   		() =>{
   		})
  }
}
