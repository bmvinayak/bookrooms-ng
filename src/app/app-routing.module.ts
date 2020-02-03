import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalComponent } from './rental/rental.component';
import { RentalListComponent } from './rental/rental-list/rental-list.component';
import { RentalDetailComponent } from './rental/rental-detail/rental-detail.component';


const routes: Routes =[
	{path: '', redirectTo: '/rentals', pathMatch: 'full'},
	{path: 'rentals',
	 component: RentalComponent,
	 children:[
		{path: '', component: RentalListComponent},
		{path: ':rentalId', component: RentalDetailComponent}
		]
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
