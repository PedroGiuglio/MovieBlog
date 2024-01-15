import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NewsComponentComponent } from './news-component/news-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DataServices } from './data.firebase';
import { MoviesService } from './movies-service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponentComponent,
    HomeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    FormsModule
  ],
  providers: [DataServices, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
