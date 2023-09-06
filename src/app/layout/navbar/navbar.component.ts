import { Component, HostListener, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  chageNavStyle: boolean = false;
  hideNav: string = '0px';
  logoURL: string = 'assets/logo.png'
  phoneNumber: string = '333 333 333'
  isLoggedIn: boolean = false;
  userEmail: string = '';
  userData: any;
  isHamburgerToggled: boolean = false;
  @ViewChild('nav') nav!: ElementRef;
  priceSum!: number;

  constructor(private authService: AuthService, private userService: UsersService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.sumPriceObs.subscribe(val => {
      this.priceSum = val;
    })
    this.authService.loggedIn.subscribe(val => {
      this.isLoggedIn = val;
    })
    this.authService.userLoggedIn.subscribe(val => {
      if (val) {
        this.userEmail = val.email;
        this.userService.loadUsers().subscribe(data => {
          this.userData = data.find(user => user['uid'] == val.uid)
        })
      }
    })

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const navHeight = this.nav.nativeElement.offsetHeight;
    
    if (window.scrollY >= navHeight) {
      this.hideNav = '-' + navHeight + 'px';
    } else {
      this.hideNav = '-' + window.scrollY.toString() + 'px';
    }

    if (!this.chageNavStyle && window.scrollY >= 200) {
      this.chageNavStyle = true
      this.logoURL = 'assets/logo-black.png'
    }
    else if (this.chageNavStyle && window.scrollY < 200) {
      this.chageNavStyle = false
      this.logoURL = 'assets/logo.png'
    }
  }

  onLogOut() {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.userEmail = '';
    }
  }

  hamburgerToggle() {
    this.isHamburgerToggled = !this.isHamburgerToggled;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.classList.contains('hamburger')
      && !clickedElement.classList.contains('dropdown')
      && !clickedElement.classList.contains('hamburger2')
      && this.isHamburgerToggled) {
      this.hamburgerToggle()
    }
  }

}
