import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {

  dishDetails: any;
  id!: string;
  @ViewChild('Image') image!: ElementRef;
  orderedCount!: number;
  howManyLeft!: number;

  constructor(private dishService: DishesService, private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    this.route.params.subscribe(valId => {
      this.id = JSON.parse(JSON.stringify(valId)).id
      
      this.dishService.loadOneDish(this.id).subscribe(data => {
        this.dishDetails = data.data();
        this.howManyLeft = this.dishDetails.howManyLeft;
        this.image.nativeElement.style.backgroundImage = `url(${this.dishDetails.image})`
        setTimeout(() => {
          this.image.nativeElement.children[0].children[0].style.opacity = 1
        }, 500);
      })
    })
   
    this.getOrderedCount()
  }

  removeFromCart() {
    this.orderedCount -= 1;
    this.cartService.removeFromCart(this.id, this.dishDetails);
  }

  addToCart() {
    this.orderedCount += 1;
    this.cartService.addToCart(this.id, this.dishDetails);
  }

  getOrderedCount(){
    const index = this.cartService.cart.findIndex(item => item[0] == this.id);
    if(index != -1){
      this.orderedCount = this.cartService.cart[index][1].orderedCount;
    } else {
      this.orderedCount = 0;
    }
  }

}
