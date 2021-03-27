import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { Service } from '../../services/service';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [HomeComponent, CartComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule
  ],
  providers: [Service]
})
export class StoreModule { }
