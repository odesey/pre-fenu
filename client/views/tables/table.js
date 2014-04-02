Template.table.helpers({
	numberOfGuests: function () {
		return this.guests.length;
	},
	myGuests: function () {
		return this.guests;
	},
	myMessages: function() {
		return Messages.find({tableID: this._id});
	},
	messageCount: function() {
		return Messages.find({tableID: this._id}).count();
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
	},
	'click .dropdown-collapse': function (e) {
		// console.log('clicked my nestable list');
		// $("#main-nav .dropdown-collapse").on(click_event, function(e) {
		  var link, list;
		  var body = $("body");
		  e.preventDefault();
		  link = $(e.target.parentElement);
		  list = link.parent().find("> ul");
		  if (list.is(":visible")) {
		    if (body.hasClass("main-nav-closed") && link.parents("li").length === 1) {
		      false;
		    } else {
		      link.removeClass("in");
		      list.slideUp(300, function() {
		        return $(e.target.parentElement).removeClass("in");
		      });
		    }
		  } else {
		    if (list.parents("ul.nav.nav-stacked").length === 1) {
		      $(document).trigger("nav-open");
		    }
		    link.addClass("in");
		    list.slideDown(300, function() {
		      return $(e.target.parentElement).addClass("in");
		    });
		  }
		  return false;
		// });
	}
});