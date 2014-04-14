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
    // var orders = Orders.find({table: this._id})
    return Orders.find({table: this._id})
  },
  tableTab: function() {
    var currentTab = Tabs.findOne({table: this._id});
    if (currentTab !== undefined) {
      // console.log(currentTab);
      return currentTab.ballance.toPrecision(4);
    } else {
      return 0;
    };
    
  }
});

Template.waiterRoot.events({
	// 'click .box-collapse': function (e) {
	  // var box = $(e.target).parents(".box").first();
	  // box.toggleClass("box-collapsed");
	  // e.preventDefault();
	  // return false;
	// },
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
		var _this = this;
		// console.log('clicked my nestable list');
		if (e.target.textContent == "Messages") {
			// Meteor.call('updateLastTimeRead', this);
		};
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
		        if (e.target.textContent == "Messages") {
		        	// Meteor.call('updateLastTimeRead', this);
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
		    	// var updatedTime = new Date().getTime();
		    	// Tables.update(this._id, {$set: {lastReadTime: updatedTime}});
		      return $(e.target.parentElement).addClass("in");
		      // Meteor.call('updateLastTimeRead', this);
		    });

		  }
		  // Meteor.call('updateLastTimeRead', this);
		  return false;
		// });
	},
	'click .comment': function (e) {
		e.preventDefault();
		var currentTable = this._id;
		Session.set("tableID", currentTable);
	},
  'click .btn-group': function (e) {
    e.preventDefault();
    var orderChange = $(e.target).attr('class');
    // console.log(orderChange);
    if (orderChange == "btn btn-success" || orderChange == "icon-thumbs-up-alt") {
        // console.log(this);
      if (this.confirmed == false) {
        // need to move this to a method call
        // Orders.update(this._id, {$set: {confirmed: true}});
        Meteor.call('confirmOrder', this, function (error, result) {});
      };
    } else if (orderChange == "btn btn-danger" || orderChange == "icon-thumbs-down-alt") {
      // console.log(this);
      if (this.confirmed == true) {
        // need to move this to a method call
        // Orders.remove(this._id);
        // Orders.update(this._id, {$set: {confirmed: false}});
        Meteor.call('voidOrder', this, function (error, result) {});
        console.log('remove the order from the table tab if its there');
      };
    } else if (orderChange == "btn btn-primary" || orderChange == "icon-pencil") {
      console.log('add notes to the order via modal');
    };
    // console.log(this);
    // switch (orderChage)
    // {
    // case "icon-thumbs-up-alt":
    //   if (this.confirmed !== true) {
    //     Orders.update(this._id, {$set: {confirmed: true}});
    //     Meteor.call('updateTab', this, function (error, result) {});
    //   };
    //   break;
    // case "icon-thumbs-down-alt":
    //   console.log('remove the order from the table tab if its there');
    //   break;
    // case "icon-pencil":
    //   console.log('add notes to the order via modal');
    //   break;
    // }
    // if (this.confirmed !== true) {
    //   Orders.update(this._id, {$set: {confirmed: true}});
    //   Meteor.call('updateTab', this, function (error, result) {});
    // };
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
	  // return i;
  	// for each message check its submitted time
  	// for each message thats newer than your last time read i++
  	// stop checking messages if its submitted time is less than your last time read
  	// return i

  	// return 6;
  

};