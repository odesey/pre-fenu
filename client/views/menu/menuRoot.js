// Template.menuRoot.helpers({
//   myWaiterName: function () {
//   	if (Tables.findOne(Session.get("tableID")).guests.length !== 0) {
//       var tableCreator = Tables.findOne({_id: Session.get('tableID')}).creator;
//   		var myWaiter = Meteor.users.findOne({_id: tableCreator});
//       return myWaiter.profile.firstName + myWaiter.profile.lastName;
//   	} else {
//   		return false;
//   	};
    
//   }
// });
Template.menuRoot.helpers({
  menuItems: function () {
    return Items.find();
  }
});

// Handlebars.registerHelper("guests", function() {
//   if (Tables.findOne(Session.get("tableID")) !== undefined) {
//   		return Tables.findOne(Session.get("tableID")).guests;
//   	} else {
//   		return false;
//   	};
// });

Template.menuRoot.events({
  'click .order': function(e) {
    console.log('order an item from the menu');
  }
});