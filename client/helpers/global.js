Handlebars.registerHelper("guests", function() {
  // console.log('guests global helper');
  if (Tables.findOne(Session.get("tableID")) !== undefined) {
  		return Tables.findOne(Session.get("tableID")).guests;
  	} else {
  		return false;
  	};
});

Handlebars.registerHelper("myMessages", function() {
  // console.log('myMessages global helper');
	if (Tables.findOne(Session.get("tableID")) !== undefined) {
		var tableID = Session.get('tableID');
		return Messages.find({tableID: tableID});
	} else {
		return Messages.find({tableID: this._id});
	};
});

Handlebars.registerHelper("messageCount", function() {  
	// console.log('message count helper');
	if (Tables.findOne(Session.get("tableID")) !== undefined) {
		var tableID = Session.get('tableID');
		return Messages.find({tableID: tableID}).count();
	} else {
		return Messages.find({tableID: this._id}).count();
	}
});



// Handlebars.registerHelper("myWaiterName", function() {
// 	  var myTable = Tables.findOne(Session.get("tableID"));
// 	  console.log(myTable);
// 	  if (myTable !== undefined) {
// 	    var tableCreator = Tables.findOne({_id: Session.get('tableID')}).creator;
// 	    var myWaiter = Meteor.users.findOne({_id: tableCreator});
// 	    return myWaiter.profile;
// 	  } else {
// 	    console.log('myWaiter helper error!');
// 	  };
// })

// Handlebars.registerHelper("myWaiterName", function() {
// 	var myTable = Tables.findOne(Session.get("tableID"));
//     console.log(myTable !== undefined);
//     if (myTable !== undefined) {
//       var tableCreator = Tables.findOne({_id: Session.get('tableID')}).creator;
//       var myWaiter = Meteor.users.findOne({_id: tableCreator});
//       return myWaiter.profile;
//     } else {
//       console.log('myWaiter helper error!');
//     };
// });

