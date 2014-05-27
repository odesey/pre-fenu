# Template.DashboardPaymentPaypalExecute.created = ->
#   payerId = "Jerome"
 
#   Meteor.call 'executePaypalPayment', payerId, (err, res) ->
#     if res is true
#       console.log 'Your payment has been successfully executed.'
 
#     else
#       console.log 'Your payment has been refused.'
 
#     Router.go 'DashboardRoot'