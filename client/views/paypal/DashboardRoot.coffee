# Template.DashboardRoot.events
#   'click .buy-product': ->
#     product = 
#       name: 'product name'
#       description: 'production description'
#       price: 30.00
 
#     Meteor.call 'createPaypalPayment', product, (err, res) ->
#       window.location.replace res.links[1].href