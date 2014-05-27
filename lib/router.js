Router.configure({
  layoutTemplate: 'layout',
  // data: function() { return Meteor.subscribe('waiters'); },
  waitOn: function() { return [Meteor.subscribe('tables'), Meteor.subscribe('waiters')]; }
});

Router.map(function() {
  this.route('reDirect', {path: '/', data: function() { Session.set("tableID", ""); } });
  // this.route('reDirect', { path: '/', data: function() { return Meteor.subscribe('waiters'); }, waitOn: function() { Session.set("tableID", ""); } });
  this.route('menuRoot', {path: '/menu', waitOn: function() { return [Meteor.subscribe('items'), Meteor.subscribe('messages'), Meteor.subscribe('tables'), Meteor.subscribe('orders'), Meteor.subscribe('tabs')]; }});
  this.route('loginsForm', {path: '/login'});
  this.route('signupForm', {path: '/signup'});
  this.route('menuEntryForm', {path: '/menuentry'});
  this.route('waiterRoot', {path: '/waiters', waitOn: function() { return [Meteor.subscribe('tables'), Meteor.subscribe('messages'), Meteor.subscribe('orders'), Meteor.subscribe('tabs')]; }});
  this.route('paymentSummary', {path: '/payments', waitOn: function() { return [Meteor.subscribe('tables'), Meteor.subscribe('orders'), Meteor.subscribe('tabs')]; }});
  this.route('test', {path: '/test', waitOn: function() { return [Meteor.subscribe('tables'), Meteor.subscribe('orders'), Meteor.subscribe('tabs')]; }});
  this.route('btf', {path: '/btf'});

  this.route('DashboardRoot', {path: '/dashboard/'});
  this.route('DashboardPaymentPaypalExecute', {path: '/dashboard/payment/paypal/execute/'});
});
