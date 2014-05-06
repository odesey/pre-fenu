// Template.menuRoot.helpers({
//   myWaiterName: function () {
//   	if (Tables.findOne(Session.get("tableID")).guests.length !== 0) {
//       var tableCreator = Tables.findOne({_id: Session.get('tableID')}).creator;
//   		var myWaiter = Meteor.users.findOne({_id: tableCreator});
//       return myWaiter.profile.firstName + myWaiter.profile.lastName;
//   	} else {
//   		return false;
//   	};
    
//   }
// });
Template.menuRoot.helpers({
  menuItems: function () {
    return Items.find();
  }
});

// Handlebars.registerHelper("guests", function() {
//   if (Tables.findOne(Session.get("tableID")) !== undefined) {
//   		return Tables.findOne(Session.get("tableID")).guests;
//   	} else {
//   		return false;
//   	};
// });

Template.menuRoot.events({
  'click .order': function(e) {
    e.preventDefault();
    var order = {
      table: Session.get("tableID"),
      guest: Session.get("currentGuest"),
      itemName: this.name,
      itemPrice: this.price,
      itemID: this._id
    }
    if (Session.get("currentGuest") && Session.get("tableID")) {
      Meteor.call('orderItem', order, function(error, id) {

      });
    };
    console.log('order an item from the menu');
  },
  'click .img-responsive': function(e) {
    e.preventDefault();
    var nScroll = $(e.target).parents().eq(1).nextAll().find("div.pad");
    var nScrollWrapper = $(e.target).closest('.pad');
    console.log('flip the script');
    $(e.target).closest('.flip_panel').addClass('flip');
    $(nScroll).niceScroll({cursorcolor:"#00F",boxzoom:true,touchbehavior:true});


  },
  'click .back .ok': function(e) {
    e.preventDefault();
    $(e.target).closest('.flip_panel').removeClass('flip');
  }

});

Template.menuRoot.rendered = function(){
  if (!this.rendered){
     console.log('inside the if statement'); // run my code
      this.rendered = true;
    }
  // console.log('redered view');
  // $('.bxslider').bxSlider({
  //   infiniteLoop: false,
  //   hideControlOnEnd: true,
  //   pager: false,
  //   swipeThreshold: 75,
  //   infiniteLoop: true
  // });
};