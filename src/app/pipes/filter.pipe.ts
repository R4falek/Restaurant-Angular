import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../models/dish';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(dishes: any, name: string, priceMin: number, priceMax: number, category: string, cuisine: string, rating: number): any {
    let dishesFiltered = dishes;

    if (name && dishesFiltered) {
      dishesFiltered = dishes.filter((dish: any) => {
        return dish.name.toLowerCase().includes(name.toLowerCase())
      });
    }
    if (category && dishesFiltered) {
      dishesFiltered = dishesFiltered.filter((dish: any) => {
        return dish.category == category;
      })
    }
    if (cuisine && dishesFiltered) {
      dishesFiltered = dishesFiltered.filter((dish: any) => {
        return dish.cuisine == cuisine;
      })
    }
    if (rating && dishesFiltered) {
      dishesFiltered = dishesFiltered.filter((dish: any) => {
        return dish.rating == rating;
      })
    }
    if(priceMin && dishesFiltered) {
      dishesFiltered = dishesFiltered.filter((dish: any) => {
        return dish.price >= priceMin;
      })
    }
    if(priceMax && dishesFiltered) {
      dishesFiltered = dishesFiltered.filter((dish: any) => {
        return dish.price <= priceMax;
      })
    }

    return dishesFiltered
  }

}
