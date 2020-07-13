import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalComponent } from './rental/rental.component';
import { RentalListComponent } from './rental/rental-list/rental-list.component';
import { RentalDetailComponent } from './rental/rental-detail/rental-detail.component';
//import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/shared/auth.guard';
const routes: Routes =[
	{path: '', redirectTo: '/rentals', pathMatch: 'full'},
	{path: 'rentals', component: RentalComponent,
	 children:[
		{path: '', component: RentalListComponent},
		{path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard]}
		]
	},
	{path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
   	{path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
