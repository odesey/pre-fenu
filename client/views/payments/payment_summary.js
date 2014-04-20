Template.paymentSummary.helpers({
  tableBallance: function () {
  	var ballance = Tabs.findOne({table: Session.get('tableID')});
    return ballance;
  },
  guestBallance: function () {
    var table = Session.get('tableID');
    var guest = Session.get("currentGuest");
    // var table = true;
    // var equalTab = Session.get('tabDivision');
    // guest: Session.get("currentGuest") == undefined ? Meteor.user().profile.firstName : Session.get("currentGuest")
    // var splitButton = $('.button-group').find('.active')
    // var equalTab = $(splitButton).text() == "Equally" ? true : false;
    // Session.set('tabDivision', equalTab);

    // var someBallance = Tabs.findOne({table: Session.get('tableID')});
    // console.log(someBallance);

    if (table && guest !== undefined) {
      var orders = Orders.find({table: table, confirmed: true}).fetch();
      var arr2=[];
      orders.reduce(function(a, current, index) {
          if (!arr2.hasOwnProperty(current.guest)) arr2[current.guest]=0;
          arr2[current.guest]+=current.itemPrice;
      },orders[0]);
      var desired_arr=[];
      for(var i in arr2) desired_arr.push([i,arr2[i]])
    };
      // console.log(desired_arr);
      // var test = desired_arr.length;
      // if (Session.get('tabDivision') && !!test) {
      //   var equalBallance = 0;
      //   for(var i=0;i<desired_arr.length;i++) {
      //       equalBallance += desired_arr[i][1];
      //     }
      //   desired_arr.forEach(function(arr) {
      //     arr[1] = (equalBallance/desired_arr.length).toFixed(2);
      //   })
      //   return desired_arr;
      // } else {
      //   return desired_arr;
      // };
      return desired_arr;

  },
  eqBallance: function () {
    var eqBallance = Tabs.findOne({table: Session.get("tableID")});
    var myArray = Orders.find({table: Session.get("tableID"), confirmed: true}).fetch()
    var distinctArray = _.uniq(myArray, false, function(d) {return d.guest}).length;
    return (eqBallance.ballance/distinctArray).toFixed(2);
  },
  ballanceCheck: function (){
    return !!(Session.get('tabDivision'));
  }
});

Template.paymentSummary.events({
  'click #sorts': function (e) {
    e.preventDefault();
    var splitButton = $('.button-group').find('.active');
    var payBox = $(".payBox");
    var equalTab = $(e.target).text() == "Equally" ? true : false;
    Session.set('tabDivision', equalTab);

    var $container = $('.isotope').isotope({
      itemSelector: '.payBox',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.name',
        number: '[data-iTab]',
        category: '[data-category]',
        weight: function( itemElem ) {
          var weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    })
    // console.log(equalTab);
    // var payBox = $(".payBox");
    if (equalTab) {
      // console.log("set individual amount to evenly ballanced");
      payBox.each(function(index, el) {
        var groupTotal = parseFloat($('.tableTotal').find(".total").text().substr(1));
        $(el).find('.number').text('$'+(groupTotal/payBox.length).toFixed(2));
      })
    } else if (equalTab == false) {
      // console.log("set individual amount");
      payBox.each(function(index, el) {
        // console.log(el);
        $(el).find('.number').text('$'+$(el).attr('data-itab'));
      })
    };
    // console.log('isotope sort by order amounts');
    var sortValue = $(e.target).attr('data-sort-value');
    // console.log(sortValue);
    $('.button-group').find('.active').removeClass('active')
    $(e.target).addClass('active');

    $container.isotope({ sortBy: sortValue });
  }
});


Template.paymentSummary.rendered = function () {

};