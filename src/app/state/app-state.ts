import { Subject, BehaviorSubject } from 'rxjs';
import { appState, Event } from '../interfaces/shard';
import { ActionTypes } from './action';

const state = <appState>{};
export const store = new BehaviorSubject<appState>(null);
export const eventDispatcher = new Subject<Event>();

eventDispatcher.subscribe((data: Event) => {
    switch (data.type) {
        case ActionTypes.CART:
            state.cart = data.payload;
            store.next(state);
            break;

        case ActionTypes.PRODUCTS:
            state.products = data.payload;
            store.next(state);
            break;

        default:
            break;
    }
});