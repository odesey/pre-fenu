// # The following code must be accessible to the client.
 
 
// # 4. We configure Iron Router to handle the different payment steps.
// #    For more informations: https://github.com/EventedMind/iron-router
 
 
Router.map(function() {
  this.route('DashboardRoot', {
    path: '/dashboard/'
  });
  return this.route('DashboardPaymentPaypalExecute', {
    path: '/dashboard/payment/paypal/execute/'
  });
});

Template.DashboardRoot.events({
  'click .buy-product': function() {
    var product;
    product = {
      name: 'product name',
      description: 'production description',
      price: 30.00
    };
    return Meteor.call('createPaypalPayment', product, function(err, res) {
      return window.location.replace(res.links[1].href);
    });
  }
});

Template.DashboardPaymentPaypalExecute.created = function() {
  var payerId;
  payerId = window.location.search.split('PayerID=')[1];
  return Meteor.call('executePaypalPayment', payerId, function(err, res) {
    if (res === true) {
      console.log('Your payment has been successfully executed.');
    } else {
      console.log('Your payment has been refused.');
    }
    return Router.go('DashboardRoot');
  });
};
