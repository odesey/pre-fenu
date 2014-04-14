Tabs = new Meteor.Collection('tabs');

Meteor.methods({
  confirmOrder: function(itemAttributes) {
    var currentTable = Tabs.findOne({table: itemAttributes.table});
    Orders.update(itemAttributes._id, {$set: {confirmed: true}});
    // check if the table has a tab already
    if (!!currentTable) {
      // if they do then update the total
      var newTotal = currentTable.ballance += itemAttributes.itemPrice;
      Tabs.update(currentTable._id, {$set: {ballance: newTotal}});
    } else {
      // if not then create a new table
      var total = 0;
      var table = itemAttributes.table;
      var tableBallance = Orders.find({table: table, confirmed: true}).map(function(doc) { total += doc.itemPrice; });
      var tab = {
        table: itemAttributes.table,
        ballance: total,
        waiter: Meteor.user()._id,
        paid: 0
      };
      tab = Tabs.insert(tab);
    }
  },
  voidOrder: function(itemAttributes) {
    var currentTab = Tabs.findOne({table: itemAttributes.table});
    if (currentTab.ballance >= itemAttributes.itemPrice) {
      var newTab = (currentTab.ballance - itemAttributes.itemPrice);
      Tabs.update(currentTab._id, {$set: {ballance: newTab}});
      Orders.update(itemAttributes._id, {$set: {confirmed: false}});
    };
  }
});


// Meteor.methods({
//   updateTab: function(itemAttributes, orderChange) {
//     // console.log(orderChange);

//     // if (orderChange == ("btn btn-success" || "icon-thumbs-up-alt")) {
//     //   if (itemAttributes.confirmed == false) {
//     //     console.log('set confirmed true');
//     //     Orders.update(itemAttributes._id, {$set: {confirmed: true}});
//     //   };

//     // } else if (orderChange == ("btn btn-danger" || "icon-thumbs-down-alt")) {
//     //     if (itemAttributes.confirmed == true) {
//     //       console.log('set confirmed false');
//     //       Orders.update(itemAttributes._id, {$set: {confirmed: false}});
//     //     }
//     // };
//   	// console.log(itemAttributes);
//   	var currentTable = Tabs.findOne({table: itemAttributes.table});
//   	if (!!currentTable) {

//       if (orderChange == "btn btn-success" || orderChange == "icon-thumbs-up-alt") {
//         if (itemAttributes.confirmed == false) {
//           console.log('set confirmed true');
//           Orders.update(itemAttributes._id, {$set: {confirmed: true}}, function(error) {
//             if (error) {
//               // display the error to the user
//               Errors.throw(error.reason);
//             } else {
//               console.log(itemAttributes);
//             }
//           });
//           // itemAttributes = Orders.update(itemAttributes._id, {$set: {confirmed: true}});
//           // console.log(itemAttributes);
//         };

//       } else if (orderChange == "btn btn-danger" || orderChange == "icon-thumbs-down-alt") {
//           if (itemAttributes.confirmed == true) {
//             console.log('set confirmed false');
//             Orders.update(itemAttributes._id, {$set: {confirmed: false}}, function(error) {
//               if (error) {
//                 // display the error to the user
//                 Errors.throw(error.reason);
//               } else {
//                 console.log(itemAttributes);
//               }
//             });
//             // itemAttributes = Orders.update(itemAttributes._id, {$set: {confirmed: false}});
//             // console.log(itemAttributes);
//           }
//       };
      
//       if (itemAttributes.confirmed == true) {
//         console.log('add item to tab');
//         var newTotal = currentTable.ballance += itemAttributes.itemPrice;
//         Tabs.update(currentTable._id, {$set: {ballance: newTotal}});
//       } else if (itemAttributes.confirmed == false) {
//         console.log('remove item from tab');
//         var newTotal = currentTable.ballance -= itemAttributes.itemPrice;
//         Tabs.update(currentTable._id, {$set: {ballance: newTotal}});
//       };
  		
  		
//   	} else {
//       // start a new tab
//       Orders.update(itemAttributes._id, {$set: {confirmed: true}});
// 	  	var total = 0;
// 	  	var table = itemAttributes.table;
// 	  	var tableBallance = Orders.find({table: table, confirmed: true}).map(function(doc) { total += doc.itemPrice; });
// 	  	var tab = {
// 	  	  table: itemAttributes.table,
// 	  	  ballance: total,
// 	  	  waiter: Meteor.user()._id,
// 	  	  paid: 0
// 	  	};
// 	    tab = Tabs.insert(tab);
//   	  }
// 	}
// });

