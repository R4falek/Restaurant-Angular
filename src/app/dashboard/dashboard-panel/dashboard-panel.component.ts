import { OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.css']
})
export class DashboardPanelComponent implements OnInit {

  @ViewChild('frontText') frontText!: ElementRef
  dashboardStatus: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.frontText.nativeElement.style.opacity = 1
    }, 500);
  }


  onUsers() {
    this.dashboardStatus = 'users';
  }

  onDishes() {
    this.dashboardStatus = 'dishes';
  }

}
