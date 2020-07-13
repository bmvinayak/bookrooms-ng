import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router} from '@angular/router';


@Component({
  selector: 'bwm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent {
  
  constructor(private auth: AuthService,
              private router: Router) {}

  isAuthenticated(): Boolean {
      return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']) 
  }
  

}
