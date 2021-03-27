export const APIs = {

    init(parm?) {

        const BaseUrl = 'http://localhost:5000/';
        const API = {
            products: `${BaseUrl}Products`,
            orders: `${BaseUrl}Orders`,
            cart: `${BaseUrl}Cart`,
        }
        return API;
    }
}