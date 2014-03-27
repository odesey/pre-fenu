Meteor.methods({
    validUserName: function (userName, code) {
        // check(userName);
        // You have access to Meteor.users here.
        // console.log(userName);
        // console.log(Meteor.users.find({username: userName}));
        // This assumes that mere existence of a user with the same username will
        // render the entered username invalid. If there are more checks you want to
        // make, they should be made here. !!Meteor.users.find({username: userName});
        // Meteor.users.findOne({email: userName}); 
        // http://stackoverflow.com/questions/13563980/meteor-querying-other-users-by-email
        // var validUser =  Meteor.users.findOne({'emails.address': 'waiter@mail.com'});
        console.log(code);
        var validUser =  Meteor.users.findOne({'username': userName});
        console.log(validUser.profile.pin);
        if (validUser.profile.pin == Number(code)) {
            return !!validUser;
        } else if (validUser.profile.pin !== Number(code)) {
            return "inval code";
        };;
        // console.log(Meteor.users.findOne({username: userName}) + ' fetch');
        // console.log(validUser + ' validUser');
        // console.log(!!validUser);
        // if (validUser == undefined) {
        // 	return false;
        // } else {
        // 	return true;
        // };
        // console.log(!!validUser);
        
    }
});

// need to refactor these two methods into one and use an if/else statement
Meteor.methods({
  addGuest : function(guestCode, guestName){
    // console.log('Adding guest ...' + guestCode);
    var table = Tables.findOne({number: Number(guestCode)});
    Tables.update(table._id, {$addToSet: {guests: guestName} });
    // console.log(table);
    return table;
  }
});

Meteor.methods({
  removeGuest : function(guestCode, guestName){
    // console.log('Adding guest ...' + guestCode);
    var table = Tables.findOne(guestCode);
    Tables.update(table, {$pull: {guests: guestName} });
    // console.log(table + ' table found?');
    return table;
  }
});