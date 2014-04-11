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
    e.preventDefault();
    var order = {
      table: Session.get("tableID"),
      guest: Session.get("currentGuest"),
      itemName: this.name,
      itemPrice: this.price,
      itemID: this._id
    }
    if (Session.get("currentGuest") && Session.get("tableID")) {
      Meteor.call('orderItem', order, function(error, id) {

      });
    };
    console.log('order an item from the menu');
  }
});