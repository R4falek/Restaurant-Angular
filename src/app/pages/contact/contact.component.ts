import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('frontText') frontText!: ElementRef

  ngOnInit(): void {
    setTimeout(() => {
      this.frontText.nativeElement.style.opacity = 1
    }, 500);
  }
}
