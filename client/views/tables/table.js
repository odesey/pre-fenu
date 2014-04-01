Template.table.helpers({
	numberOfGuests: function () {
		return this.guests.length;
	}
});

Template.waiterRoot.events({
	'click .box-collapse': function (e) {
	  var box = $(e.target).parents(".box").first();
	  box.toggleClass("box-collapsed");
	  e.preventDefault();
	  return false;
	},
	'click .box-remove': function (e) {
		if (this.guests.length == 0) {
			var currentTableID = this._id;
			Tables.remove(currentTableID);
		} else {
			console.log('cannot delete table with guests for now');
		};
	  e.preventDefault();
	  return false;
	}
});