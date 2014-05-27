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

Template.paymentSummary.events({
  'click .payments': function (e) {
    console.log('payment option choosen');
  },
  'click .quick-button-small': function (e) {
    // e.preventDefault();
    var clickedGuest = $(e.currentTarget).children().eq(0).text();
    var currentGuest = Session.get("currentGuest");

    if (clickedGuest == currentGuest) {
      $("#sortRow").removeClass("animated flipInX").addClass("animated flipOutX");

      if ($("#sorts").is(':visible')) {
        $('#sortRow').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $("#paymentOptions").toggle();
          $("#sortRow").find("h2").text("Pay Using:");
          $("#sortRow").removeClass("animated flipOutX").addClass("animated flipInX");
          $("#sorts").toggle().addClass("animated flipInX");
        });
      } else {
        $('#sortRow').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $("#sorts").toggle();
          $("#sortRow").find("h2").text("Split Tab:");
          $("#sortRow").removeClass("animated flipOutX").addClass("animated flipInX");
          $("#paymentOptions").toggle().addClass("animated flipInX");
        });
      };

      $(".quick-button-small").each(function(index, el){
        if ($(el).children().eq(0).text() !== clickedGuest) {
          $(el).hasClass("flipOutX") ? $(el).removeClass("animated flipOutX").addClass("animated flipInY") : $(el).removeClass("animated flipInX").addClass("animated flipOutX");
        };
      })
    } else {
      $(e.currentTarget).bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
           $(e.currentTarget).removeClass("animated shake");
              }).addClass("animated shake");
      // 15459960000 tire part number front 74wr0ecdwsxl
      // 15479850000 tire part number rear 135wr0ecdwsxl
    };
  },
  'click .stdSort': function (e) {
    e.preventDefault();
    var splitButton = $('.button-group').find('.active');
    var payBox = $(".payBox");
    var equalTab = $(e.target).text() == "Equally" ? true : false;
    var sortValue = $(e.target).attr('data-sort-value');
    Session.set('tabDivision', equalTab);

    var $container = $('.isotope').isotope({
      itemSelector: '.payBox',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.name',
        number: '[data-iTab]'
      }
    })
    // console.log(e.target);
    // var payBox = $(".payBox");
    if (equalTab) {
      payBox.each(function(index, el) {
        var groupTotal = parseFloat($('.tableTotal').find(".total").text().substr(1));
        $(el).find('.number').text('$'+(groupTotal/payBox.length).toFixed(2));
      })
    } else if (equalTab == false) {
      payBox.each(function(index, el) {
        $(el).find('.number').text('$'+$(el).attr('data-itab'));
      })
    };

    // console.log('isotope sort by order amounts');
    // console.log(sortValue);
    $('.button-group').find('.active').removeClass('active')
    $(e.target).addClass('active');

    $container.isotope({ sortBy: sortValue });
  },
  'click .customSort': function (e) {
    var guests = $(".quick-button-small");
    var checkBoxes = $(".checkbox");
    var checked = 0;
    checkBoxes.each(function(index, el) {
      if (el.checked) {
        checked++;
      };
    })
    if (!checked) {
      guests.each(function(index, el) {
        $(el).children().eq(1).text("$0");
      });
    };
    $('#customBillModal').modal('toggle');
    $(".modal-backdrop").css("position", "static");
    $('.button-group').find('.active').removeClass('active')
    $(e.target).addClass('active');
  },
  'keyup input': function(e) {
    // console.log($(e.target).val());
    var groupTotal = parseFloat($('.tableTotal').find(".total").text().substr(1));
    var dynamicTotal = 0;
    var inputs = $(".customInput");
    inputs.each(function(index, el) {
      dynamicTotal += Number($(el).val());
    })
    $(".modalTotal").text("$"+(groupTotal - dynamicTotal));
    if ((groupTotal - dynamicTotal) <= 0) {
      $(".tableTotalModal").removeClass('red-background').addClass('green-background');
      $("#basicSubmit").removeClass("disabled");
    } else {
      $(".tableTotalModal").removeClass('green-background').addClass('red-background');
      $("#basicSubmit").addClass("disabled");
    };
  },
  'submit #customTabForm': function(e) {
    e.preventDefault();
    var quickButtons = $(".quick-button-small");
    var modalData = $("#customTabForm").find(".form-group");
    var activeTab = $("ul.nav-tabs li.active").children().text().trim();
    // var sortValue = $(e.target).attr('data-sort-value');
    if (activeTab == "Basic") {
      for(var i=0;i<quickButtons.length;i++) {
          // console.log('swap form data to isotope data');
          $(quickButtons[i]).find(".name").text($(modalData[i]).find(".control-label").text());
          $(quickButtons[i]).find(".number").text(Number($(modalData[i]).find(":input").val()));
        }
        $('#customBillModal').modal('toggle');
        var $container = $('.isotope').isotope({
          itemSelector: '.payBox',
          layoutMode: 'fitRows',
          getSortData: {
            number: '.number'
          }
        });
        // console.log(sortValue);
        $container.isotope({ sortBy: 'number' });
        $container.isotope('updateSortData').isotope();
    } else {
      $('#customBillModal').modal('toggle');
    };

  },
  'click .tableTotal': function(e) {
    $( "#ordersTable" ).slideToggle( "slow", function() {
      // Animation complete.
    });
  },
  'click #advSubmit': function (e) {
    e.preventDefault()
    var checkBoxes = $(".checkbox");
    $('#customBillModal').modal('toggle');
    var $container = $('.isotope').isotope({
      itemSelector: '.payBox',
      layoutMode: 'fitRows',
      getSortData: {
        number: '.number'
      }
    });
    $container.isotope({ sortBy: 'number' });
    $container.isotope('updateSortData').isotope();
    checkBoxes.each(function(index, el) {
      $(el).removeAttr('checked');
    })
    },
  'click .orders': function (e) {
    e.preventDefault()
    $(e.target).parent('tr').nextUntil('.orders').slideToggle(100);
    },
  'change input[type=checkbox].checkbox': function (e) {
      var currentTR = $(e.target).parents().eq(1).prevAll("tr.orders:first");
      var checkedTotal = $(currentTR).nextUntil('.orders').find(".checkbox");
      var splitTotal = 0;
      var mainTotal = Number($(".modalTotal").text().substring(1));
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

      if (mainTotal <= 0) {
        $(".tableTotalModal").removeClass('red-background').addClass('green-background');
        $("#advSubmit").removeClass("disabled");
      } else {
        $(".tableTotalModal").removeClass('green-background').addClass('red-background');
        $("#advSubmit").addClass("disabled");
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
      $(".modalTotal").text("$"+mainTotal.toFixed(2));

    }
});


Template.paymentSummary.rendered = function () {

};