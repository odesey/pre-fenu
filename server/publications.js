Meteor.publish('tables', function() {
  return Tables.find();
});

Meteor.publish("staff", function () {
    return Meteor.users.find({}, {fields: {username: 1,'profile': 1}});
});

Meteor.publish('messages', function() {
	return Messages.find({}, {sort: {submitted: -1}});
});

Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('orders', function() {
  return Orders.find();
});

Meteor.publish('tabs', function() {
  return Tabs.find();
});