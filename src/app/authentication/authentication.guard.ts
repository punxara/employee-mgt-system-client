import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn {

  private IS_LOGGED_IN = 'IS_LOGGED_IN';

  constructor(
    private router: Router
  ) {
  }

  canActivate(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem(this.IS_LOGGED_IN) === 'Y') {
      // this.router.navigate([`/welcome`]);
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
