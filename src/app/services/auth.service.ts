import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  isLoggedIn: boolean = false;
  session: string = 'session';

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router, private userService: UsersService, private cartService: CartService) {
    this.afAuth.setPersistence(this.session);
    this.afAuth.onAuthStateChanged((user) => {
      if(user){
        this.loggedIn.next(true);
        this.userLoggedIn.next(user);
        this.isLoggedIn = true;
      }
    })
  }
  

  login(login: string, password: string) {
    if(this.isLoggedIn){
      this.toastr.warning('Użytkownik jest zalogowany')
      return
    }
    return this.afAuth.signInWithEmailAndPassword(login, password)
      .then((result) => {
        this.toastr.success('Zalogowno')
        this.loggedIn.next(true);
        this.afAuth.authState.subscribe(user => {
          this.userLoggedIn.next(user);
        })
        this.isLoggedIn = true;
        this.router.navigate(['/'])
      })
      .catch(error => {
        this.toastr.warning(error)
      })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('Wylogowano');
      this.loggedIn.next(false);
      this.isLoggedIn = false;
      localStorage.removeItem('cart');
      localStorage.removeItem('sumPrice');
      this.cartService.sumPrice = 0;
      this.cartService.sumPriceObs.next(0);
      this.cartService.cart = [];
      this.router.navigate(['/login']);
    }).catch(err => {
      this.toastr.warning(err);
    })
  }

  registerUser(email: string, password: string) {
    if(this.isLoggedIn){
      this.toastr.warning('Najpierw się wyloguj')
      return
    }
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe(user => {
          const userData: User = {
            uid: user?.uid,
            email: email,
            role: 'user',
            history: []
          }
          this.userService.saveUser(userData)
          this.toastr.success('Zarejestrowano');
          this.loggedIn.next(true);
          this.userLoggedIn.next(user);
          this.isLoggedIn = true;
          this.router.navigate(['/'])
        })
      }).catch(error => {
        return { isValid: false, message: error.message }
      })
  }

}
