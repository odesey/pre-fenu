// Template.menuRoot.helpers({
//   guests: function () {
//   	if (Tables.findOne(Session.get("tableID")).guests.length !== 0) {
//   		return Tables.findOne(Session.get("tableID")).guests;
//   	} else {
//   		return false;
//   	};
    
//   }
// });

Handlebars.registerHelper("guests", function() {
  if (Tables.findOne(Session.get("tableID")) !== undefined) {
  		return Tables.findOne(Session.get("tableID")).guests;
  	} else {
  		return false;
  	};
});

// Template.menuRoot.events({
//   'click #delUser': function(e) {
//     console.log('clicked delete');
//   	var code = Tables.findOne(Session.get("tableID"))._id;
//   	var guestToDelete = $(e.target).parent().text().trim();
//     Meteor.call('removeGuest', code, guestToDelete, function (error, result) {
//       console.log(result);
//     } );
//   	// Tables.update(currentTableID, {$pull: {guests: guestToDelete} });
//     console.log('delete a user');
//     // console.log(e);
//   }
// });