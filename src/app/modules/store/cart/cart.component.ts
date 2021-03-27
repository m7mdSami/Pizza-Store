import { Component, OnInit } from '@angular/core';
import { eventDispatcher, store } from 'src/app/state/app-state';
import { products, cart, cartItem } from '../../../interfaces/shard';
import { ActionTypes } from 'src/app/state/action';
import { Service, APIs } from '../../../services/shard';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: cart;
  alert: boolean | object = false
  products: products[];

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.watchStore()
  }

  watchStore() {
    store.subscribe(res => {
      // Cart
      if (res?.cart) {
        this.cart = res.cart
      }

      if (res?.products) {
        this.products = res.products
      }
      // console.log('store', res)
    });
  }

  decrease(index) {
    console.log(index);

    if(this.cart.cartItem[index].quantity == 1) {
      return
    }

    this.cart.quantity -= 1;
    this.cart.cartItem[index].quantity -= 1;
    this.cart.cartItem[index].product.quantity += 1;

    let total = +this.cart.cartItem[index].product.price + +this.cart.total;

    let products = this.products.filter(product => product.id != this.cart.cartItem[index].product.id)

    eventDispatcher.next({ type: ActionTypes.CART, payload: this.cart});
    eventDispatcher.next({ type: ActionTypes.PRODUCTS, payload: products});
  }

  increase(index) {
    console.log(index);

    if(this.cart.cartItem[index].quantity == 1) {
      return
    }

    if(this.cart.cartItem[index].product.quantity == 0) {
      this.alert = {
        msg: `There is not enough quantity for this product`,
        status: 'danger'
      };
      this.hideMsg()
      return
    } 

    this.cart.quantity += 1;
    this.cart.cartItem[index].quantity += 1;
    this.cart.cartItem[index].product.quantity -= 1;

    let total = +this.cart.cartItem[index].product.price + +this.cart.total;

    let products = this.products.filter(product => product.id != this.cart.cartItem[index].product.id)

    eventDispatcher.next({ type: ActionTypes.CART, payload: this.cart});
    eventDispatcher.next({ type: ActionTypes.PRODUCTS, payload: products});

  }

  remove(index) {
    this.cart.quantity -= +this.cart.cartItem[index].quantity;
    this.cart.cartItem[index].product.quantity += +this.cart.cartItem[index].quantity;
    this.cart.cartItem.splice(index, 1);

    let total = 0;
    for(let item of this.cart.cartItem) {
      total += +item.product.price * +item.quantity
    }

    this.cart.total = total;
    let products = this.products.filter(product => product.id != this.cart.cartItem[index].product.id)
    eventDispatcher.next({ type: ActionTypes.CART, payload: this.cart});
    eventDispatcher.next({ type: ActionTypes.PRODUCTS, payload: [...products,this.cart.cartItem[index].product ]});
  }

  checkout() {
    eventDispatcher.next({ type: ActionTypes.CART, payload: {}});
    this.alert = {
      msg: `Created Order Successfully`,
      status: 'primary'
    };
    this.hideMsg()
    return
  }

  hideMsg(){
    setTimeout(() => {
      this.alert = false;
    }, 2500);
  }

}
