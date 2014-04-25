var someVar = "test";

Template.test.helpers({
  tableBallance: function () {
  	var ballance = Tabs.findOne({table: Session.get('tableID')});
    return ballance;
  },
  guestBallance: function () {
    var table = Session.get('tableID');
    var guest = Session.get("currentGuest");

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
      return desired_arr;
  },
  eqBallance: function () {
    var eqBallance = Tabs.findOne({table: Session.get("tableID")});
    var myArray = Orders.find({table: Session.get("tableID"), confirmed: true}).fetch()
    var distinctArray = _.uniq(myArray, false, function(d) {return d.guest}).length;
    if (!!eqBallance) {
      return (eqBallance.ballance/distinctArray).toFixed(2);
    };
  },
  ballanceCheck: function (){
    return !!(Session.get('tabDivision'));
  },
  tableOrders: function () {
    var table = Session.get('tableID');
    return Orders.find({table: table, confirmed: true});
  }
});

Template.test.events({
  'click .orders': function (e) {
    e.preventDefault()
    $(e.target).parent('tr').nextUntil('.orders').slideToggle(100);
  },
'change input[type=checkbox].checkbox': function (e) {
    var currentTR = $(e.target).parents().eq(1).prevAll("tr.orders:first");
    var checkedTotal = $(currentTR).nextUntil('.orders').find(".checkbox");
    var splitTotal = 0;
    var mainTotal = Number($(".total").text().substring(1));
    var checked = !!e.target.checked;
    var guests = $(".quick-button-small");
    var checkBoxes = $(event.target).parents().eq(1).prevAll("tr.orders:first").nextUntil('.orders').find(".checkbox");
    var guestName = $(e.target).parent().text();
    var clickGuestPriorTotal = $(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1);
    var itemPrice = Number($(e.target).parents().eq(1).prevAll("tr.orders:first").children().eq(1).text()).toFixed(2);

    checkedTotal.each(function(index, el) {
      if (el.checked) {
        return splitTotal++;
      };
    })
    // update main tab ref box
    if (checked && (splitTotal == 1)) {
      mainTotal = (mainTotal - Number($(currentTR).children().eq("1").text()));
    } else if (!checked && (splitTotal == 0)) {
      mainTotal = (mainTotal + Number($(currentTR).children().eq("1").text()));
    };


    if (checked) {
      // only if this is the first person being assigned to a ordered item 
      // var guestName = $(e.target).parent().text();
      // var itemPrice = $(e.target).parents().eq(1).prevAll("tr.orders:first").children().eq(1).text();
        // if (splitTotal == 1) {
        //   var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
        //   $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal + Number(itemPrice)).toFixed(2));
        // } else {
          // if we are adding more than one person to an ordered item we need to adjust the percentages
          // first we increase the price of the person being added to the order by the correct percent
          // console.log('when will this run?');
          // var itemPrice = (itemPrice / splitTotal).toFixed(2);
          // var _itemPrice = itemPrice;
          // var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
          // $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal + Number(itemPrice)).toFixed(2));
          // then we decrease the price for the folks already sharing the order
          checkBoxes.each(function(index, el) {
            if (el.checked) {
              var guestName = $(el).parent().text();
              // var clickedGuest = $(event.target).parent().text();
              // var clickGuestPriorTotal = $(".quick-button-small").find('.name:contains('+clickedGuest+')').next().text().substring(1);
              // var itemPrice = $(event.target).parents().eq(1).prevAll("tr.orders:first").children().eq(1).text();
              var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
              var adjustPercent = (itemPrice/splitTotal)/itemPrice*100;
              var adjustmentNumber = (itemPrice - ((adjustPercent / 100) * itemPrice));

              // console.log(testPercent+" "+"this is how much i should be subtracting from my existingTotal"); 
              console.log(adjustPercent+" "+"percentage i need to adjust the price by for existing guests sharing this order");
              console.log(itemPrice+" "+"this number minus previous number % ");
              console.log(existingTotal+" "+"existingTotal number I will be subtracting from");
              console.log(adjustmentNumber+" "+"this is the number i am subtracting from the existing Total");
              console.log(itemPrice/splitTotal+" "+ "simple division of itemPrice")
              console.log(existingTotal - ((adjustPercent / 100) * itemPrice));
              console.log((itemPrice/100).toFixed(2));
              console.log(clickGuestPriorTotal+" "+"prior total for clied guest");
              
              if ($(el).parent().text() == $(event.target).parent().text()) {
                $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal + (itemPrice/splitTotal)).toFixed(2));
              } else {
                if (Number(clickGuestPriorTotal) !== 0) {
                  // $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - (itemPrice/splitTotal)).toFixed(2));
                  $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+((existingTotal - (itemPrice/(splitTotal-1))) + (itemPrice/splitTotal)).toFixed(2));
                } else {
                  $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal * (1 - (itemPrice/splitTotal)/itemPrice)).toFixed(2));
                };
              };

              // if ((Number(existingTotal)*(adjustPercent/100)).toFixed(2) !== adjustmentNumber.toFixed(2)) {
              //   var adjustmentNumber = (itemPrice - ((adjustPercent / 100) * itemPrice));
              //   $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - adjustmentNumber).toFixed(2));
              // } else {
                // $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - adjustmentNumber).toFixed(2));
              // };
              // itemPrice = ((itemPrice/splitTotal)/itemPrice*100)/100*existingTotal;
              // itemPrice = ((itemPrice/splitTotal)/itemPrice*100)/100*itemPrice
              // var itemPrice = Number(existingTotal) > 0 && (guestName !== $(event.target).parent().text()) ? ((itemPrice/splitTotal)/itemPrice*100)/100*existingTotal : ((itemPrice/splitTotal)/itemPrice*100)/100*itemPrice;
              // $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - adjustmentNumber).toFixed(2));
            };
          })
        } else {
        // var guestName = $(e.target).parent().text();
        // var itemPrice = $(e.target).parents().eq(1).prevAll("tr.orders:first").children().eq(1).text();
        // only if this is the last person being removed from an ordered item
        if (splitTotal == 0) {
          var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
          $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - Number(itemPrice)).toFixed(2));
        } else {
          console.log('update the boxes that are still checked.');
          itemPrice = (itemPrice / (splitTotal+1)).toFixed(2);
          var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
          $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - Number(itemPrice)).toFixed(2));
          // then we increase the price for the folks still sharing the order
          checkBoxes.each(function(index, el) {
            if (el.checked && ($(el).parent().text() !== $(event.target).parent().text())) {
              var guestName = $(el).parent().text();
              var itemPrice = $(event.target).parents().eq(1).prevAll("tr.orders:first").children().eq(1).text();
              var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
              var adjustPercent = (itemPrice/splitTotal)/itemPrice*100;
              var adjustmentNumber = (existingTotal + ((adjustPercent / 100) * itemPrice));
              // itemPrice = ((itemPrice/splitTotal) / itemPrice * 100) / 100 * existingTotal;
              // var itemPrice = Number(existingTotal) > 0 ? ((itemPrice/splitTotal)/itemPrice*100)/100*existingTotal : ((itemPrice/splitTotal)/itemPrice*100)/100*itemPrice;

              $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal + adjustmentNumber).toFixed(2));
            };
          })
        }
      };


    $(currentTR).children().eq("2").text(splitTotal);
    $(".total").text("$"+mainTotal.toFixed(2));

  }
});