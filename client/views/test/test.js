

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

        checkBoxes.each(function(index, el) {
          if (el.checked) {
            var guestName = $(el).parent().text();
            var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
            var adjustPercent = (itemPrice/splitTotal)/itemPrice*100;
            var adjustmentNumber = (itemPrice - ((adjustPercent / 100) * itemPrice));
            
            if ($(el).parent().text() == $(event.target).parent().text()) {
              $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal + (itemPrice/splitTotal)).toFixed(2));
            } else {
              if (Number(clickGuestPriorTotal) !== 0) {
                $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+((existingTotal - (itemPrice/(splitTotal-1))) + (itemPrice/splitTotal)).toFixed(2));
              } else {
                $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal * (1 - (itemPrice/splitTotal)/itemPrice)).toFixed(2));
              };
            };

          };
        })
      } else {
        var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
        if (splitTotal == 0) {
          // var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
          $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - Number(itemPrice)).toFixed(2));
        } else {
          // var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
          $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal - Number(itemPrice / (splitTotal+1))).toFixed(2));
          // then we increase the price for the folks still sharing the order
          checkBoxes.each(function(index, el) {
            if (el.checked && ($(el).parent().text() !== $(event.target).parent().text())) {
              var guestName = $(el).parent().text();
              var existingTotal = Number($(".quick-button-small").find('.name:contains('+guestName+')').next().text().substring(1));
              var adjustPercent = (itemPrice/splitTotal)/itemPrice*100;
              var adjustmentNumber = (itemPrice - ((adjustPercent / 100) * itemPrice));

              $(".quick-button-small").find('.name:contains('+guestName+')').next().text("$"+(existingTotal + (itemPrice/(splitTotal+1)/splitTotal)).toFixed(2));
            };
          })
        }
    };

    $(currentTR).children().eq("2").text(splitTotal);
    $(".total").text("$"+mainTotal.toFixed(2));

  },
  'click .contact .action': function(e) {
    e.preventDefault;
    console.log('flip the script');
    $(e.target).closest('.thumb').addClass('flip');
  },
  'click .md-trigger': function(e) {

    $("#modal-18").addClass('md-show');

    setTimeout( function() {
      $(document.documentElement).addClass( 'md-perspective' );
    }, 25 );

  },
  'click .md-close': function(e) {
    $("#modal-18").removeClass('md-show');
    setTimeout( function() {
      $(document.documentElement).removeClass( 'md-perspective' );
    }, 30 );
  },
  'click .pageNav': function(e) {
    
    
  }

});

Template.test.rendered = function(){
  

};