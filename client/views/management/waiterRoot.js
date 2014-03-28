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
		}
		table._id = Tables.insert(table);
		console.log('add a new table with ID of ' + tableCode);
	}
});

Template.waiterRoot.helpers({
	myTables: function () {
		var currentUser = Meteor.userId();
		return Tables.find({creator: currentUser});
	}
});
