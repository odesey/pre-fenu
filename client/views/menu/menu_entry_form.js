 Template.menuEntryForm.rendered = function(){
  $("#catergory").select2({
    tags: ["Appetizer", "Desert", "Drink", "Entree", "Side Dish"],
    tokenSeparators: [",", " "],
    placeholder: "Select the catergorie(s) for this item"
  });
};

Template.menuEntryForm.events({
	'submit #menuForm': function (e) {
		e.preventDefault();
		console.log('submit menu form');
    var item = {
      name: $("#name").val(),
      price: Number($("#price").val()),
      picture: $("#picture").val(),
      catergory: [$("#catergory").val()],
      ingredients: $("#ingredients").val(),
      description: $("#description").val()
    }
    Meteor.call('addItem', item, function(error, id) {
      // if (error) {
      //   // display the error to the user
      //   Errors.throw(error.reason);
      //   if (error.error === 302)
      //     // Router.go('postPage', {_id: error.details})
      // } else {
      //   // Router.go('postPage', {_id: id});
      // }
    });
	}
});