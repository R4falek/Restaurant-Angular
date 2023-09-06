import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit, AfterViewInit {

  @Input() dishData: any;
  @ViewChild('image') imageCont!: ElementRef;
  meanRate!: number;

  ngOnInit(): void {
    this.meanRate = this.meanRatingCalculate();
  }

  ngAfterViewInit(): void {
    this.imageCont.nativeElement.style.backgroundImage = `url(${this.dishData.image})`
  }

  meanRatingCalculate() {  
    if (this.dishData.rating.length != 0) {
      let sum = 0;
      this.dishData.rating.forEach((element: number) => {
        sum += element
      });
      return sum / this.dishData.rating.length;
    }
    return -1;
  }

}
