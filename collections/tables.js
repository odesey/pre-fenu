Tables = new Meteor.Collection('tables');

Tables.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; } 
      });