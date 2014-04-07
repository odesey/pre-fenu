Template.waiterRoot.events({
	'click #addTable': function (e) {
		e.preventDefault();
		var tableCode = Math.floor(Math.random()*90000) + 10000;
		var tableNumber = Number($('#tableNumber').val());

		var table = {
			code: tableCode,
			tableNumber: tableNumber,
			creator: Meteor.userId(),
			guests: []
		};
		Meteor.call('addTable', table, function(error, messageId) {
		  if (error){
		    console.log('error creating your table');
		  } else {
		    // $(msg).val('');
		  }
		});
		console.log('add a new table with ID of ' + tableCode);
	}
});

Template.waiterRoot.helpers({
	myTables: function () {
		var currentUser = Meteor.userId();
		return Tables.find({creator: currentUser});
	},
	firstName: function() {
		if (Meteor.user()) {
			return Meteor.user().profile.firstName;
		};		
	},
	newMessages: function () {
		// // only execute if last time read is undefined OR the messages table has been updated...use the new oplog methods
		// // get the last time you read your messages
		// var timeRef = Session.get("lastReadTime");
		// // get a list of all the tables
		// var tableList = $('.chat');
		// // for each table get a list of messages
		// $('.chat').each(function(el){
		// 	console.log(el);
		// });
		// // for each message check its submitted time
		// // for each message thats newer than your last time read i++
		// // stop checking messages if its submitted time is less than your last time read
		// // return i

		// // return 6;
	}
});

Template.waiterRoot.rendered = function(){
  	// // only execute if last time read is undefined OR the messages table has been updated...use the new oplog methods
  	// // get the last time you read your messages
  	// var timeRef = Session.get("lastReadTime");
  	// // get a list of all the tables
  	// var tableList = $('.chat');
  	// // for each table get a list of messages
  	// $('.chat').each(function(el){
  	// 	console.log(el);
  	// });
  	// // for each message check its submitted time
  	// // for each message thats newer than your last time read i++
  	// // stop checking messages if its submitted time is less than your last time read
  	// // return i

  	// // return 6;
  

};
