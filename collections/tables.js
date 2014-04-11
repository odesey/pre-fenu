Tables = new Meteor.Collection('tables');

Tables.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; } 
      });

Meteor.methods({
  addTable: function(tableAttributes) {

    var table = _.extend(_.pick(tableAttributes, 'code', 'tableNumber', 'creator', 'guests'), {
      lastReadTime: new Date().getTime()
    });
    table = Tables.insert(table);
    // return message;
  },
  updateLastTimeRead: function(table) {
    var updatedTime = new Date().getTime();
    Tables.update(table._id, {$set: {lastReadTime: updatedTime}});
    // return table;
  },
  lastReadTime: function() {
      return new Date().getTime();
  }
});

// Meteor.methods({
//     lastReadTime: function() {
//         return new Date().getTime();
//     }
// });