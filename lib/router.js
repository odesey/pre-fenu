Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('reDirect', {path: '/', data: function() { Session.set("tableID", ""); } });
  this.route('menuRoot', {path: '/menu'});
  this.route('waiterRoot', {path: '/tables'});
});