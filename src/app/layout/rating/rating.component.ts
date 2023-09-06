import { Component, Input, OnInit } from '@angular/core';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { Dish } from 'src/app/models/dish';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  rate: number = 0;
  meanRate!: number;
  @Input() dishDetails: any;
  @Input() id!: string;
  isRated: boolean = false;

  constructor(private dishService: DishesService) {
    defineComponents(IgcRatingComponent);
  }

  ngOnInit(): void {
    this.meanRate = this.meanRatingCalculate()
  }

  ratingChanged($event: any) {
    this.rate = $event.target.value;
  }

  onSubmit() {
    let newRating = new Array<number>();
    if (this.dishDetails.rating) {
      newRating = this.dishDetails.rating;
      newRating.push(this.rate)
    } else {
      newRating.push(this.rate);
    }
    const newDish: Dish = {
      name: this.dishDetails.name,
      price: this.dishDetails.price,
      description: this.dishDetails.description,
      image: this.dishDetails.image,
      ingredients: this.dishDetails.ingredients,
      cuisine: this.dishDetails.cuisine,
      category: this.dishDetails.category,
      rating: newRating
    }
    this.dishService.editDish(this.id, newDish);
    console.log(this.dishDetails);
    
    this.meanRate = this.meanRatingCalculate()
    this.isRated = true
  }

  meanRatingCalculate() {  
    if (this.dishDetails.rating.length != 0) {
      let sum = 0;
      this.dishDetails.rating.forEach((element: number) => {
        sum += element
      });
      return sum / this.dishDetails.rating.length;
    }
    return -1;
  }

}
