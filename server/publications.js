Meteor.publish('tables', function() {
  return Tables.find();
});

Meteor.publish("staff", function () {
    return Meteor.users.find({}, {fields: {username: 1,'profile.pin': 1}});
});

Meteor.publish('messages', function() {
	return Messages.find();
})