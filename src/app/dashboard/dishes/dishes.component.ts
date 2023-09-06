import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  dishArray!: Array<any>;
  selectedDishId!: string;
  selectedDish: any = {
    name: '',
    price: '',
    description: '',
    image: '',
    ingredients: '',
    cuisine: '',
    category: '',
    rating: [],
    opinion: [],
    howManyLeft: undefined
  };

  formStatus: string = 'Dodaj'
  previewImageUrl: string = 'assets/preview.png'

  constructor(private dishService: DishesService) { }

  ngOnInit(): void {
    this.dishService.loadDishes().subscribe(data => {
      this.dishArray = data
    })
  }

  onSubmit(form: any) {
    if(this.formStatus == 'Dodaj'){
      const newDish: Dish = {
        name: form.value.name,
        price: form.value.price,
        description: form.value.description,
        image: form.value.image,
        ingredients: form.value.ingredients,
        cuisine: form.value.cuisine,
        category: form.value.category,
        rating: []
      }
      this.dishService.saveDish(newDish)
    } else if(this.formStatus == 'Edytuj'){
      this.dishService.editDish(this.selectedDishId, this.selectedDish)
    }

    form.reset()

    this.onCancel(form)
  }

  onEdit(dish: any) {
    this.selectedDishId = dish.id;
    this.previewImageUrl = dish.image;
    this.selectedDish = {
      name: dish.name,
      price: dish.price,
      description: dish.description,
      image: dish.image,
      ingredients: dish.ingredients,
      cuisine: dish.cuisine,
      category: dish.category,
      // rating: dish.rating,
      // opinion: dish.opinion,
      howManyLeft: dish.howManyLeft
    }
    this.formStatus = 'Edytuj'
  }

  onDelete(dish: any) {
    this.dishService.deleteDish(dish.id);
  }

  onCancel(form: any) {
    this.formStatus = 'Dodaj'
    this.previewImageUrl = 'assets/preview.png'
    form.reset()
  }

  showPreview($event: any) {
    if($event.target.value == ''){
      this.previewImageUrl = 'assets/preview.png'
    } else {
      this.previewImageUrl = $event.target.value;
    }
  }

}
