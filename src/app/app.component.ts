import { Component, OnInit } from '@angular/core';
import { eventDispatcher, store } from 'src/app/state/app-state';
import { ActionTypes } from 'src/app/state/action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  quantity: number = 0;

  ngOnInit(): void {
    this.watchStore()
  }

  watchStore() {
    store.subscribe(res => {
      // Cart
      if (res?.cart) {
        this.quantity = res.cart.quantity
      }
      // console.log('store', res)
    });
  }
}
