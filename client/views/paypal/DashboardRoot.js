Template.DashboardRoot.events({
  'click .buy-product': function() {
    var product;
    product = {
      name: 'product name',
      description: 'production description',
      price: 30.00
    };
    Meteor.call('createPaypalPayment', product, function(err, res) {
      return window.location.replace(res.links[1].href);
    });
  }
});
