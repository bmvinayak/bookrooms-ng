import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AuthService} from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  registerMessage: string = '';
  accessMessage: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.activateRouter.params.subscribe((params) => {
      if (params['Registered'] === 'Success') {
        this.registerMessage = 'You have been successfully registered. You may login now!!!';
      }
      if (params['Access'] === 'Unauthorised') {
        this.accessMessage = 'Could not authenticate or session expired. Please re-login!!!';
      }
    })
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['',
              [Validators.required, 
               Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
              ]
             ],
      password: ['',Validators.required]
    })
  }

  isValidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid && 
          (this.loginForm.controls[fieldName].dirty 
            || this.loginForm.controls[fieldName].touched)

  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  login() {
    const authServiceObserable = this.authService.login(this.loginForm.value);
    authServiceObserable.subscribe(
      (token) =>{
        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        } else {
          this.router.navigate(['/rentals']);
        }
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      })
  }
}
