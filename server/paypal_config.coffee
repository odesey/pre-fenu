# ###
#   This gist illustrates how to create and execute a payment with Paypal using their REST API.
#   For additional informations, check the documentation: https://developer.paypal.com/docs/api/
  
#   Note 1: I assume that you have already created a developer account for Paypal and an application.
#           To test that your code is working, use the sandbox accounts.
#           https://developer.paypal.com/webapps/developer/applications/accounts
  
#   Note 2: we will not use the Paypal REST API SDK package for Node.js
#           https://github.com/paypal/rest-api-sdk-nodejs
# ###
 
# # The following code must be only run on the server!
 
# # 1. Create your paypal configuration object.
 
 
# @paypalConf =
#   host: "api.sandbox.paypal.com"
#   clientId: "AfReXBAKk5i0Fv0_FXqrwhAb7vrkQYbqpHzkQ99ARkj4KyUPSK1cqjxwHeWK"
#   clientSecret:"EJi9xBDsJQDXesjxZI-WuJ6tPUvC3BciUhP1N9dobENyH3TYnx4euKbSAUbb"
 
 
# # 2. Create two collections to save our payments and the Paypal tokens.
 
 
# @PaypalPayments = new Meteor.Collection 'paypal_payments'
# @PaypalTokens = new Meteor.Collection 'paypal_tokens'
 
 
# # 3. Create the three methods to:
# #    - Get a valid token to make API calls. (retrieve a new one if invalid)
# #    - Create a payment
# #    - Execute a payment.
 
 
# Meteor.methods
#   'getPaypalToken': ->
#     isTokenValid = 0
#     token = PaypalTokens.findOne({ timestamp: { $exists: true } },
#       { sort: { timestamp: -1 } })
 
#     if token?
#       isTokenValid = Math.ceil((new Date().getTime() - token.timestamp) / 1000)
 
#     # is the token invalid?
#     if isTokenValid is 0 or isTokenValid > token.expires_in
#       auth = paypalConf['clientId'] + ':' +
#              paypalConf['clientSecret']
 
#       token = EJSON.parse(
#         Meteor.http.post('https://api.sandbox.paypal.com/v1/oauth2/token',
#           headers:
#             'Accept': 'application/json'
#             'Accept-Language': 'en_US'
#           auth: auth
#           params:
#             'grant_type': 'client_credentials'
#         ).content)
 
#       token['timestamp'] = new Date().getTime()
 
#       # we insert the new valid token to retrieve it later
#       PaypalTokens.insert token
 
#     return token
 
#   'createPaypalPayment': (product) ->
#     token = Meteor.call 'getPaypalToken'
 
#     payment =
#       intent: 'sale'
#       payer:
#         payment_method: 'paypal'
 
#       redirect_urls:
#         return_url: 'http://localhost:3000/dashboard/payment/paypal/execute'
#         cancel_url: 'http://localhost:3000/dashboard'
 
#       transactions: [
#         item_list:
#           'items': [
#             'name': product.name,
#             'price': product.price,
#             'currency': 'USD',
#             'quantity': 1
#           ]
 
#         amount:
#           total: product.price
#           currency: 'USD'
 
#         description: product.description
#       ]
 
#     res = Meteor.http.post 'https://api.sandbox.paypal.com/v1/payments/payment',
#       headers:
#         Authorization: 'Bearer ' + token.access_token
#         'Content-Type': 'application/json'
#       data: payment
 
#     res.data['userId'] = @userId
 
#     # we insert the payment details (for the payment id during execution)
#     PaypalPayments.insert res.data
 
#     return res.data
 
#   'executePaypalPayment': (payerId) ->
#     payment = PaypalPayments.findOne({ userId: @userId },
#       { sort: { 'create_time': -1 } })
 
#     token = Meteor.call 'getPaypalToken'
 
#     url = 'https://api.sandbox.paypal.com/v1/payments/payment/' +
#            payment.id + '/execute'
 
#     res = Meteor.http.post url,
#       headers:
#         Authorization: 'Bearer ' + token.access_token
#         'Content-Type': 'application/json'
#       data:
#         payer_id: payerId
 
#     payment = res.data
#     payment['userId'] = @userId
 
#     if payment.state in ['approved' , 'pending']  # Be careful, in production the payment state is "pending"
#       # we insert the sucessful payment here
#       PaypalPayments.insert payment
    
#     return if payment.state is 'approved' then true else false 