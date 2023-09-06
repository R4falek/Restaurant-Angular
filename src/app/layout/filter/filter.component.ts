import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() dishArray: any;
  @ViewChild('filterToggler') filterToggler!: ElementRef;
  isFilterToggled: boolean = false;
  categoryOptions!: Array<string>;
  cuisineOptions!: Array<string>;
  priceMax!: number;
  priceMin!: number;
  formValues: any = {
    name: '',
    priceMin: 0,
    priceMax: 300,
    category: '',
    cuisine: '',
    rating: 0
  }

  constructor(private dishService: DishesService) { }

  ngOnInit(): void {
    this.dishService.loadDishes().subscribe(data => {
      this.dishArray = data;
      this.getOptions();
    })
  }

  filterToggle() {
    this.isFilterToggled = !this.isFilterToggled
  }

  getOptions() {
    this.categoryOptions = []
    this.cuisineOptions = []
    this.dishArray.forEach((dish: any) => {
      if (!this.categoryOptions.find(item => item == dish.category)) {
        this.categoryOptions.push(dish.category)
      }
      if (!this.cuisineOptions.find(item => item == dish.cuisine)) {
        this.cuisineOptions.push(dish.cuisine)
      }
    })
    this.categoryOptions.sort();
    this.cuisineOptions.sort();
    this.priceMax = this.dishArray.reduce((max: number, obj: any) => (obj.price > max ? obj.price : max), this.dishArray[0].price)
    this.priceMin = this.dishArray.reduce((min: number, obj: any) => (obj.price < min ? obj.price : min), this.dishArray[0].price) 
    this.formValues.priceMax = this.priceMax;
    this.formValues.priceMin = this.priceMin; 
  }

  onSubmit() {
    this.formValues = {
      name: '',
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      category: '',
      cuisine: '',
      rating: 0
    }
  }

}
