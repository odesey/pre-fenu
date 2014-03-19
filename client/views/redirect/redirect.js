Template.reDirect.events({
  'submit form': function(e) {
    e.preventDefault();
    var code = $("input#tableCode").val();
    var guest = $("input#name");
    var table = Tables.findOne({number: Number(code)});
    // check if the code field is not empty and is only numeric characters
    if (code !== "" && $.isNumeric(code)) {
      if (code.length == 5) {
        console.log('redirect to menu root page');
        if (table !== undefined) {
          Tables.update(table._id, {$addToSet: {guests: $(guest).val()} });
          Session.set("tableID", table._id);
          Router.go('menuRoot');
        } else {
          console.log('code not found in table DB');
        };
        
      } else if (code.length == 7) {
        console.log('redirect to waiter root page');
        Session.set("userCode", code);
        // placeholder code, if the username and code matches a user in the DB we present the password field to login
        // var userName = $("input#name").val();
        // var el = $("input#name");
        var elPass = $("input#tableCode");
        $(guest).attr("placeholder", $(guest).val());
        $(guest).attr("disabled", true);
        $(elPass).attr("type", "password");
        $(elPass).val('');
        // Meteor.defer(function() {
        //   Router.go('reDirect');
        // });
      } else {
        console.log('invalid code');
      };
      
    };
    
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