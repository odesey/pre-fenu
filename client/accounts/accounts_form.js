Template.signupForm.events({
  "submit form": function(event, template) {
    event.preventDefault();
    Accounts.createUser({
      username: template.find("#email").value,
      password: template.find("#password").value,
      profile: {
        firstName: template.find("#firstName").value,
        lastName: template.find("#lastName").value,
        avatar: template.find("#avatar").value,
        pin: template.find("#pin").value
        // Other required field values can go here
      }
    }, function(error) {
      if (error) {
        console.log('there was an error');
      } else {
        console.log('account was created without problem');
      }
    });
  }
  // Router.go('reDirect');
});

Template.loginForm.events({
  "submit #login-form": function(event, template) {
    event.preventDefault();
    Meteor.loginWithPassword(
      template.find("#login-username").value,
      template.find("#login-password").value,
      function(error) {
        if (error) {
          // Display the login error to the user however you want
        }
      }
    );
  }
});

Template.logoutForm.events({
  "submit #logout-form": function(event, template) {
    event.preventDefault();
    Meteor.logout(function(error) {
      if (error) {
        // Display the logout error to the user however you want
      }
    });
  }
});