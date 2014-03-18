Template.reDirect.events({
  'submit form': function(e) {
    e.preventDefault();
    var code = $("input#tableCode").val();
    // check if the code field is not empty and is only numeric characters
    if (code !== "" && $.isNumeric(code)) {
      if (code.length == 5) {
        console.log('redirect to menu root page');
        // var codeCheck = Tables.find({number: code}).fetch().length;
        if (Tables.find({number: Number(code)}).count() !== 0) {
          Router.go('menuRoot');
        } else {
          console.log('code not found in table DB');
        };
        
      } else if (code.length == 7) {
        console.log('redirect to waiter root page');
        Router.go('waiterRoot');
      } else {
        console.log('invalid code');
      };
      
    };
    
  }
});

Template.waiterRoot.helpers({
  tables: function () {
    return Tables.find();
  }
});