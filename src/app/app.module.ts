import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './layout/carousel/carousel.component';
import { MapComponent } from './layout/map/map.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DishComponent } from './layout/dish/dish.component';
import { FilterComponent } from './layout/filter/filter.component';
import { LoginComponent } from './pages/login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DashboardPanelComponent } from './dashboard/dashboard-panel/dashboard-panel.component';
import { UsersComponent } from './dashboard/users/users.component';
import { DishesComponent } from './dashboard/dishes/dishes.component';
import { DishDetailsComponent } from './pages/dish-details/dish-details.component';
import { CommentsComponent } from './layout/comments/comments.component';
import { SingleCommentComponent } from './layout/single-comment/single-comment.component';
import { RatingComponent } from './layout/rating/rating.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    CarouselComponent,
    MapComponent,
    MenuComponent,
    DishComponent,
    FilterComponent,
    LoginComponent,
    DashboardPanelComponent,
    UsersComponent,
    DishesComponent,
    DishDetailsComponent,
    CommentsComponent,
    SingleCommentComponent,
    RatingComponent,
    FilterPipe,
    ContactComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
