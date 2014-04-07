// var Users = Meteor.subscribe('waiters');
// Template.home.events({
//   'submit form': function(e) {
//   e.preventDefault();
//   var guest = $("input#name");
//   var userNameEntered = $(guest).val();
//   var isValidUsername = Meteor.call('validUserName', userNameEntered);
// });
Meteor.subscribe('staff');
// Meteor.subscribe('tables');

Template.reDirect.events({
  'submit #accessForm': function(e) {
    e.preventDefault();
    // Session.set('staffMember', false);
    var code = $("input#tableCode").val();
    var guest = $("input#name");
    var userNameEntered = $(guest).val();
    var table = Tables.findOne({code: Number(code)});
    // var isValidUsername = Meteor.call('validUserName', userNameEntered);
    // check if the code field is not empty and is only numeric characters
    if (code !== "" && $.isNumeric(code)) {
      if (code.length == 5) {
        console.log('redirect to menu root page');
        if (table !== undefined) {
          Meteor.call('addGuest', code, userNameEntered, function (error, result) {
           // console.log(result);
         } );
          Meteor.call('lastReadTime', function (error, result) {
            Session.set("lastReadTime", result);
          });
          // Tables.update(table._id, {$addToSet: {guests: $(guest).val()} });
          Session.set("tableID", table._id);
          Session.set("currentGuest", userNameEntered);
          
          Router.go('menuRoot');
        } else {
          console.log('code not found in table DB');
        };
        
      } else if (code.length == 7) {
        console.log('redirect to waiter root page');
        // Meteor.call('validUserName', userNameEntered);

        Meteor.call('validUserName', userNameEntered, code, function (isUserNameValid, result) {
            console.log(result);
            console.log(isUserNameValid);
             if (result == true) {
              console.log('method returned true');
              Session.set('staffMember', true);
             } else {
              // Session.set('staffMember', false);
             };
             // ... take action here.
        });

        console.log('did method check on server');
        if ((Session.get('staffMember')) == true) {
          console.log('valid employee');
          var elPass = $("input#tableCode");
          $(guest).attr("placeholder", $(guest).val());
          $(guest).attr("disabled", true);
          $(elPass).attr("type", "password");
          $(elPass).val('');
          $(elPass).attr("placeholder", "Enter Your Password");
          $(elPass).focus();
          $('#submit').text('Login').removeClass("btn-success").addClass('btn-primary');
          $('#accessForm').attr('id', 'loginForm');
          // $('#submit').attr('id', 'login');
          // Router.go('waiterRoot');
        }

      } else {
        console.log('invalid code 2');
      };
      
    };
    
  },
  'submit #loginForm': function(e, t) {
    console.log('time to login');
    e.preventDefault();
      // retrieve the input field values
      var username = t.find('#name').value;
      var password = t.find('#tableCode').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        console.log('about to login');
        Meteor.loginWithPassword({username:username}, password, function(err){
          console.log('in the login function');
          if (err) {console.log(err);}
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          else {
            Session.set('staffMember', false);
            Router.go('waiterRoot');
          }
          // The user has been logged in.
          console.log(err);
          Meteor.call('lastReadTime', function (error, result) {
            Session.set("lastReadTime", result);
          });
      });
        return false; 
      }
  });

Template.waiterRoot.helpers({
  tables: function () {
    return Tables.find();
  },
  userIsWaiter: function () {
    if (Session.get("userCode") !== undefined) {
      return true;
    } else {
      return false;
    };
  },
  placeHolder: function () {
    return $("input#name").val();
  }
});

// Template.waiterRoot.rendered = function() {
//   var error = this.data;
//   Meteor.defer(function() {
//     Errors.update(error._id, {$set: {seen: true}})
//   });
// };