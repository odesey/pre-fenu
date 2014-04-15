// var DateFormats = {
//        short: "DD MMMM - YYYY",
//        long: "MM/DD/YYYY HH:mm"
// };

// Handlebars.registerHelper("formatDate", function(datetime, format) {
//   if (moment) {
//     f = DateFormats[format];
//     return moment(datetime).format(f);
//   }
//   else {
//     return datetime;
//   }
// });

Template.table.helpers({
	numberOfGuests: function () {
		return this.guests.length;
	},
	myGuests: function() {
		return this.guests;
	},
	orderCount: function() {
		return Orders.find({table: this._id}).count()
	},
  tableOrders: function() {
    return Orders.find({table: this._id})
  },
  tableTab: function() {
    var currentTab = Tabs.findOne({table: this._id});
    if (currentTab !== undefined) {
      return currentTab.ballance.toPrecision(3);
    } else {
      return "0.00";
    };
    
  }
});

Template.table.events({
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
    e.preventDefault();
		var _this = this;
		if (e.target.textContent == "Messages") {
		};
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
		        if (e.target.textContent == "Messages") {
		        	var updatedTime = new Date().getTime();
		        	Tables.update(_this._id, {$set: {lastReadTime: updatedTime}});
		        };

		        return $(e.target.parentElement).removeClass("in");
		      });
		    }
		  } else {
		    if (list.parents("ul.nav.nav-stacked").length === 1) {
		      $(document).trigger("nav-open");
		    }
		    link.addClass("in");
		    list.stop().slideDown(300, function() {
		      return $(e.target.parentElement).addClass("in");
		    });

		  }
		  return false;
	},
	'click .comment': function (e) {
		e.preventDefault();
		var currentTable = this._id;
		Session.set("tableID", currentTable);
	},
  'click .btn-group': function (e) {
    e.preventDefault();
    var orderChange = $(e.target).attr('class');
    if (orderChange == "btn btn-success" || orderChange == "icon-thumbs-up-alt") {
      if (this.confirmed == false) {
        Meteor.call('confirmOrder', this, function (error, result) {});
      };
    } else if (orderChange == "btn btn-danger" || orderChange == "icon-thumbs-down-alt") {
      if (this.confirmed == true) {
        Meteor.call('voidOrder', this, function (error, result) {});
      };
    } else if (orderChange == "btn btn-primary" || orderChange == "icon-pencil") {
      $('#orderNotesModal').modal('toggle');
      $(".modal-backdrop").css("position", "static");
      Session.set("currentNote", this._id);
    };
  },
  'submit #addNotesForm': function(e) {
    e.preventDefault();
    var $note = $("#notesText");
    if ($note.val().trim() !== "") {
      var noteText = $note.val().trim()
      Meteor.call('addOrderNotes', Session.get("currentNote"), noteText, function (error, result) {});
      Session.set("currentNote", undefined);
      $note.val('');
      $('#orderNotesModal').modal('toggle');  
    };
  }
});

Template.table.rendered = function(){

	// $('[data-lastRead]').data("data-lastRead", )
	// console.log(this.findAll("li.message"));
	// console.log($('.message'));
	// console.log($("li.message"));
  	// only execute if last time read is undefined OR the messages table has been updated...use the new oplog methods
  	// get the last time you read your messages
  	var timeRef = this.data.lastReadTime;
  	// get a list of all the tables
  	// var tableList = $('.chat');
  	var messageList = this.findAll("small.msg");
  	var i = 0;
  	var messageCount = this.find("span.msgCount");
  	// console.log(messageList.length);
  	// console.log(this.find("span.msgCount"));
  	// for each table get a list of messages
  	if (messageList.length != 0) {
	  	$(messageList).each(function(index, element){
	  		// console.log($('.msgCount').val())
	  		// console.log('iterating over the li');
	  		// console.log(element.textContent.trim());
	  		var date1 = new Date(Number(element.textContent.trim()));
	  		var date2 = new Date(timeRef);
	  		// console.log(date2);
	  		// console.log(date1 < date2);
	  		if (date1 > date2) {
	  		    console.log("last msg checked time less than message time");
	  		    i++;
	  		}
	  		// var diff = date2 - date1;
	  		// console.log(Date(timeRef));
	  	});
	  };
	  // $(messageCount).text(i + '/' + messageList.length);
    $(messageCount).prepend(i + '/');

};