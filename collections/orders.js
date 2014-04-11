Orders = new Meteor.Collection('orders');

Orders.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; } 
      });

Meteor.methods({
  orderItem: function(orderAttributes) {
    var order = _.extend(_.pick(orderAttributes, 'table', 'guest', 'itemName', 'itemPrice', 'itemID'), {
      confirmed: false,
      submitted: new Date().getTime()
    });
    order = Orders.insert(order);
  }
});
