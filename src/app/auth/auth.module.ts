import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { HTTP_INTERCEPTORS} from '@angular/common/http';

import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';


//import { AuthRoutingModule } from './auth-routing.module';

//import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
