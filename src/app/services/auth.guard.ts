import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      this.isLoggedIn = this.authService.isLoggedIn

      if(this.isLoggedIn){
        return true;
      }
      else {
        this.toastr.warning('Nie masz dostępu')
        this.router.navigate(['/login']);
        return false;
      }
  }
}