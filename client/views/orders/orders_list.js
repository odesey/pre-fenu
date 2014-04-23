Template.ordersList.helpers({
  tableOrders: function () {
    var table = Session.get('tableID');
    return Orders.find({table: table, confirmed: true});
  }
});