import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('frontImage') frontImage!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.frontAnimation();
  }

  frontAnimation() {
    setTimeout(() => {
      this.frontImage.nativeElement.children[0].children[0].style.opacity = 1
    }, 500);
    setTimeout(() => {
      this.frontImage.nativeElement.children[0].children[3].style.opacity = 1
    }, 900)
    setTimeout(() => {
      this.frontImage.nativeElement.children[1].children[0].style.opacity = 1
    }, 1300)
    setTimeout(() => {
      this.frontImage.nativeElement.children[1].children[1].style.opacity = 1
    }, 1700)
  }
}
