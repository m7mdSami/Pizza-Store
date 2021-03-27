var Products = require('./Products.json');
var Cart = require('./Cart.json');
// and so on

module.exports = function () {
    return {
        Products,
        Cart
    }
}