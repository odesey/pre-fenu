Items = new Meteor.Collection('items');

Meteor.methods({
  addItem: function(itemAttributes) {
    var item = Items.insert(itemAttributes);
    return item;
  }
});