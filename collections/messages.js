Messages = new Meteor.Collection('messages');

Meteor.methods({
  message: function(messageAttributes) {
    var user = Meteor.user();
    // console.log(user);
    if (user == undefined) {
    	user = "guest";
    } else {
    	user = "waiter";
    };

    var message = _.extend(_.pick(messageAttributes, 'messageText', 'tableID', 'guest'), {
      read: false,
      sentBy: user,
      submitted: new Date().getTime()
    });
    message = Messages.insert(message);
    // return message;
  }
});

// Meteor.methods({
//     lastReadTime: function() {
//         return new Date().getTime();
//     }
// });
