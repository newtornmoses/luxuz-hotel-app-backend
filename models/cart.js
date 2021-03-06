module.exports = function cart(oldcart) {
    this.items = oldcart.items || {};
    this.totalQty = oldcart.totalQty || 0;
    this.totalprice = oldcart.totalprice || 0;

    this.add = function(item, id) {
        var storeditem = this.items[id];

        if (!storeditem) {
            storeditem = this.items[id] = { item: item, price: 0, qty: 0 };
        }


        storeditem.qty++;
        storeditem.price = storeditem.item.price * storeditem.qty;
        this.totalQty++;
        this.totalprice += storeditem.item.price;



    }


    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }

    this.removeItem = function() {
        if (req.session.cart) {
            req.session.items = {};
            req.session.totalQty = 0;
            req.session.totalprice = 0;
        }
        storeditem = {
            item: " ",
            price: 0,
            qty: 0
        }
        this.items = {};
        this.totalQty = 0;
        this.totalprice = 0;

    }
}