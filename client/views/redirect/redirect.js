Template.reDirect.events({
  'submit form': function(e) {
    e.preventDefault();
    var code = $("#tableCode").val()
    if (code.length == 5) {
      console.log('redirect to the menu page');
      Router.go('menuRoot');
    } else if (code.length == 7) {
      Router.go('waiterRoot');
      console.log('redirect to the Waiter Manager page');
    } else {
      console.log('you entered a wrong code')
    };

  }
});