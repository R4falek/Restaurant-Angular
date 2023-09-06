import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('FrontText') frontText!: ElementRef;
  @ViewChild('Price') price!: ElementRef;
  @ViewChild('BuyButton') buyButton!: ElementRef;
  sumPrice!: number;
  cart: any;
  userData: any;

  constructor(private cartService: CartService, private authService: AuthService, private userService: UsersService) { }

  ngOnInit(): void {
    this.cartService.sumPriceObs.subscribe(val => {
      this.sumPrice = val;
    })
    this.cart = this.cartService.cart;
    setInterval(() => {
      this.frontText.nativeElement.style.opacity = 1;
    }, 500);
    setInterval(() => {
      this.price.nativeElement.style.opacity = 1;
    }, 900);
    setInterval(() => {
      if (this.buyButton)
        this.buyButton.nativeElement.style.opacity = 1;
    }, 1300);

    this.authService.userLoggedIn.subscribe(val => {
      if (val) {
        this.userService.loadUsers().subscribe(data => {
          this.userData = JSON.parse(JSON.stringify(data.find(user => user['uid'] == val.uid)))
        })
      }
    })
  }

  removeFromCart(item: any) {
    const price = item[1].priceSum / item[1].orderedCount;
    this.cartService.removeFromCart(item[0], { price: price })
  }

  buy() {
    this.cartService.buy(this.userData);
    this.cart = [];
  }
}
