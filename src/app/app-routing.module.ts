import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalComponent } from './rental/rental.component';
import { RentalListComponent } from './rental/rental-list/rental-list.component';
import { RentalSearchComponent } from './rental/rental-search/rental-search.component';
import { RentalDetailComponent } from './rental/rental-detail/rental-detail.component';
import { RentalCreateComponent } from './rental/rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental/rental-update/rental-update.component';
// import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ManageComponent } from './manage/manage.component';
import { ManageRentalComponent } from './manage/manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage/manage-booking/manage-booking.component';
import { AuthGuard } from './auth/shared/auth.guard';
import { RentalGuard } from './rental/shared/rental.guard';



const routes: Routes = [
	{ path: '', redirectTo: '/rentals', pathMatch: 'full' },
	{
		path: 'rentals', component: RentalComponent,
		children: [
			{ path: '', component: RentalListComponent },
			{ path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
			{ path: ':city/homes', component: RentalSearchComponent },
			{ path: ':rentalId', component: RentalDetailComponent },
			{ path: ':rentalId/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGuard] }
		]
	},
	{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
	{
		path: 'manage', component: ManageComponent,
		children: [
			{ path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] },
			{ path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard] }
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
