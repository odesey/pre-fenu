// Template.menuRoot.helpers({
//   guests: function () {
//   	if (Tables.findOne(Session.get("tableID")).guests.length !== 0) {
//   		return Tables.findOne(Session.get("tableID")).guests;
//   	} else {
//   		return false;
//   	};
    
//   }
// });

Handlebars.registerHelper("guests", function() {
  if (Tables.findOne(Session.get("tableID")) !== undefined) {
  		return Tables.findOne(Session.get("tableID")).guests;
  	} else {
  		return false;
  	};
});