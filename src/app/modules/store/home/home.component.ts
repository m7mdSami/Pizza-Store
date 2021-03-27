import { Component, OnInit } from '@angular/core';
import { Service, APIs } from '../../../services/shard';
import { products, cart, cartItem } from '../../../interfaces/shard';
import { eventDispatcher, store } from 'src/app/state/app-state';
import { ActionTypes } from 'src/app/state/action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: products[];
  quantity: number = 0;
  cart: cart;
  alert: boolean | object = false

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.watchStore()
  }

  watchStore() {
    store.subscribe(res => {
      // Cart
      console.log('store', res)
      if (res?.cart) {
        this.cart = res.cart
      }

      if (res?.products && res?.products.length) {
        this.products = res?.products;
      } else {
        this.getProducts()
      }

    });
  }

  getProducts() {
    this.service.get<products[]>(APIs.init().products).subscribe(res => {
      this.products = res;
      console.log(res)
    })
  }

  addToCart(index) {
    console.log(this.products[index]);

    let product = this.products[index]

    if(this.alert) {
      return
    }
    
    if(this.products[index].quantity == 0) {
      this.alert = {
        msg: `There is not enough quantity for this product`,
        status: 'danger'
      };
      this.hideMsg()
      return
    }

    this.products[index].quantity -= 1;

    let cart: cart = this.cart || {};
    let cartItem: cartItem[] = this.cart?.cartItem || [];
    let total = this.cart ? +product.price + +this.cart.total : +product.price;

    let productIsExist: cartItem = cartItem.find((item, index) => {
      if(item.product.id === product.id) {
        cartItem.splice(index, 1);
        return item
      }
    });

    console.log(productIsExist)
    if (productIsExist) {
      let quantity = productIsExist.quantity += 1;
      console.log(cartItem)
      cartItem = [...cartItem, { quantity, product: productIsExist.product }];
    } else {
      cartItem = [...cartItem, { quantity: 1, product: product }]; 
    }

    cart.total = total;
    cart.quantity = cart.quantity ? cart.quantity + 1 : 1;
    cart.cartItem = cartItem;

    this.service.post<cart>(APIs.init().cart, cart).subscribe(res => {
      // console.log(res);
      eventDispatcher.next({ type: ActionTypes.CART, payload: res});
      eventDispatcher.next({ type: ActionTypes.PRODUCTS, payload: this.products});

      this.alert = {
        msg: `Product added to your cart`,
        status: 'primary'
      };
      this.hideMsg()
    })
  }

  hideMsg(){
    setTimeout(() => {
      this.alert = false;
    }, 2500);
  }

}
