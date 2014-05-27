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
      // console.log('myWaiter helper error!');
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
  },
  'click .guestMsgToggle': function(e) {
    // console.log('clicked dropdown to view messages');
    var messageCount = $('.guestMsgCount');
    var messageList = $('[data-submitted]');
    $(messageCount).text(0 + '/' + messageList.length);
    Session.set("lastReadTime", new Date().getTime());
  },
  'click .toggle-nav': function(e) {
    // e.preventDefault();
    console.log('toggle slide out menu');
    $(".st-container").toggleClass("st-menu-open")
    // $.slidebars();
  }
});

Template.header.rendered = function(){
  // $.slidebars();
  var timeRef = Session.get("lastReadTime");
  var messageList = $('[data-submitted]');
  var i = 0;
  var messageCount = $('.guestMsgCount');
  if (messageList.length != 0) {
    $(messageList).each(function(index, element){
      var date1 = new Date($(element).data("submitted"));
      var date2 = new Date(timeRef);
      if (date1 > date2) {
          // console.log("last msg checked time less than message time");
          i++;
      }
    });
  };
  $(messageCount).text(i + '/' + messageList.length);
};