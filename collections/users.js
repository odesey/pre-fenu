Meteor.methods({
    validUserName: function (userName) {
        // check(userName);
        // You have access to Meteor.users here.
        // console.log(userName);
        // console.log(Meteor.users.find({username: userName}));
        // This assumes that mere existence of a user with the same username will
        // render the entered username invalid. If there are more checks you want to
        // make, they should be made here. !!Meteor.users.find({username: userName});
        console.log(userName + ' username');
        var validUser =  Meteor.users.findOne({username: userName});
        console.log(Meteor.users.findOne({username: userName}) + ' fetch');
        console.log(validUser + ' validUser');
        if (validUser == undefined) {
        	return false;
        } else {
        	return true;
        };
        console.log(!!validUser);
        // return !!validUser;
    }
});