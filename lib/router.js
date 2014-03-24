Router.configure({
  layoutTemplate: 'layout',
  data: function() { return Meteor.subscribe('waiters'); }
});

Router.map(function() {
  this.route('reDirect', {path: '/', data: function() { Session.set("tableID", ""); } });
  // this.route('reDirect', { path: '/', data: function() { return Meteor.subscribe('waiters'); }, waitOn: function() { Session.set("tableID", ""); } });
  this.route('menuRoot', {path: '/menu'});
  this.route('signupForm', {path: '/signup'});
  this.route('waiterRoot', {path: '/tables', waitOn: function() { return Meteor.subscribe('tables'); }});
});