Template.paymentSummary.helpers({
  tableBallance: function () {
  	ballance = Tabs.findOne({table: Session.get('tableID')});
    return ballance;
  },
  guestBallance: function () {
    // console.log("guest ballance helper");
    var table = Session.get('tableID');
    var guest = Session.get("currentGuest");
    // var table = true;
    // var guest = true;
    if (table && guest !== undefined) {
      // var ballance = Meteor.call('guestBallance', table, guest, function (error, result) {
      // console.log(result + "result on the client side");
      // console.log(ballance);
      var orders = Orders.find({table: table, confirmed: true}).fetch();
      var arr2=[];
      orders.reduce(function(a, current, index) {
          if (!arr2.hasOwnProperty(current.guest)) arr2[current.guest]=0;
          arr2[current.guest]+=current.itemPrice;
      },orders[0]);
      var desired_arr=[];
      for(var i in arr2) desired_arr.push([i,arr2[i]])
    };
      console.log(desired_arr);
      return desired_arr;
  }
});
