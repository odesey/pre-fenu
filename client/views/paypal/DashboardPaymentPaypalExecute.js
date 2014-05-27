Template.DashboardPaymentPaypalExecute.created = function() {
  var payerId;
  payerId = window.location.search.split('PayerID=')[1];
  Meteor.call('executePaypalPayment', payerId, function(err, res) {
    if (res === true) {
      console.log('Your payment has been successfully executed.');
    } else {
      console.log('Your payment has been refused.');
    }
    Router.go('DashboardRoot');
  });
};
