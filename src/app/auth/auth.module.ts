import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';




import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SameAsDirective } from '../common/validators/same-as-other.directive';


@NgModule({
	declarations: [AuthComponent, LoginComponent, RegisterComponent, SameAsDirective],
	imports: [FormsModule, ReactiveFormsModule, AppRoutingModule, CommonModule],
	providers: [AuthService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class AuthModule { }
