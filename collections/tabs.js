Tabs = new Meteor.Collection('tabs');

Meteor.methods({
  updateTab: function(itemAttributes) {
  	// console.log("updating tab");
  	var currentTable = Tabs.findOne({table: itemAttributes.table});
  	if (!!currentTable) {
  		var newTotal = currentTable.ballance + itemAttributes.itemPrice
  		Tabs.update(currentTable._id, {$set: {ballance: newTotal}});
  	} else {
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
	}
});


// Orders.aggregate( [ { $group: { _id: null, total: { $sum: "$wins" } } } ] )

// Orders.find({table: "AXEHKo2AizRrLdMuv"}).map(function(doc) { total += doc.itemPrice; });

// totalBallance = _.reduce(_.map(Orders.find({_id: table}).fetch(), 
//                 function(doc) {
//                   //map
//                   return doc.itemPrice
//                 }), 
//                 function(memo, num){ 
//                   //reduce
//                   return memo + num;
//                 });