Items = new Meteor.Collection('items');

Meteor.methods({
  addItem: function(itemAttributes) {
    item = Items.insert(itemAttributes);
    return item;
  }
});