// Meteor.publish('tables', function() {
//   return Tables.find();
// });

Meteor.publish("staff", function () {
    return Meteor.users.find();
});