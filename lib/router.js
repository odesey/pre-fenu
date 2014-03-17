Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('reDirect', {path: '/'});
  this.route('menuRoot', {path: '/menu'});
  this.route('waiterRoot', {path: '/tables'});
});