import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { History } from '../models/history';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  sumPriceObs: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  sumPrice: number = 0;
  cart: Array<[string, History]> = [];

  constructor(private toastr: ToastrService, private userService: UsersService) {
    const cartString = localStorage.getItem('cart');
    const priceString = localStorage.getItem('sumPrice');
    
    if(cartString && priceString){
      this.cart = JSON.parse(cartString);
      this.sumPrice = parseFloat(priceString);
      this.sumPriceObs.next(this.sumPrice);
    }
  }

  addToCart(id: string, dish: any) {
    this.toastr.success('Dodano do koszyka')
    this.sumPrice += dish.price;
    localStorage.setItem('sumPrice', this.sumPrice.toString());
    this.sumPriceObs.next(this.sumPrice);
    const newHistory: History = {
      dishName: dish.name,
      orderedCount: 1,
      priceSum: dish.price,
      date: new Date()
    }
    loop: for (const item of this.cart) {
      if (item[0] == id) {
        item[1].date = new Date();
        item[1].orderedCount += 1;
        item[1].priceSum += dish.price;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        return
      }
    }
    this.cart.push([id, newHistory])
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(id: string, dish: any) {
    this.sumPrice -= dish.price;
    localStorage.setItem('sumPrice', this.sumPrice.toString());
    this.sumPriceObs.next(this.sumPrice);
    let dishToRemoveIndex = this.cart.findIndex(item => item[0] == id);
    if (this.cart[dishToRemoveIndex][1].orderedCount == 1) {
      this.cart.splice(dishToRemoveIndex, 1)
    } else {
      this.cart[dishToRemoveIndex][1].orderedCount -= 1;
      this.cart[dishToRemoveIndex][1].priceSum -= dish.price;
      this.cart[dishToRemoveIndex][1].date = new Date();
    }
    this.toastr.error('Usinięto z koszyka')
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  buy(userData: any) {
    this.sumPrice = 0;
    this.sumPriceObs.next(0);
    this.cart.forEach(item => {
      userData.history.unshift(item[1]);
    })
    this.userService.editUser(userData.id, userData)
    this.cart = [];
    this.toastr.success('Kupiono')
    localStorage.removeItem('cart');
    localStorage.removeItem('sumPrice');
  }
}

