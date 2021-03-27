import { Component, OnInit } from '@angular/core';
import { Service, APIs } from '../../../services/shard';
import { products, cart, cartItem } from '../../../interfaces/shard';
import { eventDispatcher, store } from 'src/app/state/app-state';
import { ActionTypes } from 'src/app/state/action';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: products[];
  alert: boolean | object = false;

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.watchStore()
  }

  watchStore() {
    store.subscribe(res => {
   
      if (res?.products.length) {
        this.products = res?.products;
      } else {
        this.getProducts()
      }
      
      console.log('store', res?.cart)
    });
  }

  getProducts() {
    this.service.get<products[]>(APIs.init().products).subscribe(res => {
      this.products = res;
      console.log(res)
    })
  }

  add(form: NgForm) {
    let data = form.value;
    data.id = new Date().getTime();
    let products = [...this.products, data];
    eventDispatcher.next({ type: ActionTypes.PRODUCTS, payload: products});
    form.reset();
    this.alert = {
      msg: `Item added successfully`,
      status: 'primary'
    };
    this.hideMsg()
    console.log(data)
  }

  delete(index) {
    this.products.splice(index, 1);
    eventDispatcher.next({ type: ActionTypes.PRODUCTS, payload: this.products});
    this.alert = {
      msg: `Item deleted successfully`,
      status: 'danger'
    };
  }

  hideMsg(){
    setTimeout(() => {
      this.alert = false;
    }, 2500);
  }
}
