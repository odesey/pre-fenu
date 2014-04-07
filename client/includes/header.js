// Template.header.helpers({
//   guests: function () {
//   	if (Tables.findOne(Session.get("tableID")).guests.length !== 0) {
//   		return Tables.findOne(Session.get("tableID")).guests;
//   	} else {
//   		return false;
//   	};
    
//   }
// });
// Meteor.subscribe('tables');

Template.header.helpers({
  staffLoggedIn: function () {
  	return !!Meteor.user();    
  },
  myWaiterName: function () {
    var myTable = Tables.findOne(Session.get("tableID"));
    // console.log("myWaiterName helper");
    if (myTable !== undefined) {
      // console.log("myWaiterName helper if statement is true");
      var tableCreator = Tables.findOne({_id: Session.get('tableID')}).creator;
      var myWaiter = Meteor.users.findOne({_id: tableCreator});
      return myWaiter.profile;
    } else {
      console.log('myWaiter helper error!');
    };
  }
});

Template.header.events({
  'click .del': function(e) {
    console.log('clicked delete');
  	var code = Tables.findOne(Session.get("tableID"))._id;
  	var guestToDelete = $(e.target).parent().text().trim();
    Meteor.call('removeGuest', code, guestToDelete, function (error, result) {
      console.log(result);
    } );
  	// Tables.update(currentTableID, {$pull: {guests: guestToDelete} });
    console.log('delete a user');
    // console.log(e);
  },
  'click #sendMessage': function(e) {
    e.preventDefault();
    var $msg = $("#messageText");
    var tableID;

    var message = {
      messageText: $msg.val(),
      tableID: Session.get("tableID"),
      guest: Session.get("currentGuest") == undefined ? Meteor.user().profile.firstName : Session.get("currentGuest")
    };
    Meteor.call('message', message, function(error, messageId) {
      if (error){
        console.log('error submitting your message');
      } else {
        // $(msg).val('');
      }
    });
    $msg.val('');
    console.log('submitted modal mesageForm');
    $('#messageModal').modal('toggle');
    if (Meteor.user()) {
      Session.set("tableID", undefined);
    }; 
  }
});
