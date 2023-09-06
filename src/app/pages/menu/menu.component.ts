import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('frontText') frontText!: ElementRef;
  @ViewChild('filter') filter!: any;
  dishArray!: Array<any>;
  pageNumber: number = 1;

  constructor(private dishService: DishesService) {
    dishService.loadDishes().subscribe(data => {
      this.dishArray = data;
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.frontText.nativeElement.children[0].style.opacity = 1
    }, 500);
    setTimeout(() => {
      this.frontText.nativeElement.children[1].style.opacity = 1
    }, 1000)
  }

}
