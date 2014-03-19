Template.waiterRoot.events({
	'click #addTable': function (e) {
		e.preventDefault();
		var tableNumber = Math.floor(Math.random()*90000) + 10000;
		var table = {
			number: tableNumber, 
			creator: $('#name').val(),
			guests: []
		}
		table._id = Tables.insert(table);
		console.log('add a new table with ID of ' + tableNumber);
	}
});

Template.waiterRoot.helpers({
	myTables: function () {
		return Tables.find();
	}
});
