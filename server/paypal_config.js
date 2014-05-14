this.paypalConf = {
  host: "api.sandbox.paypal.com",
  clientId: "pHQcZ1cH0lnX5Mub4MGzo_-FH6witB3_2zuRYgvUFxMHFH6wiAe3zCRDqatu3",
  clientSecret: "Xk7-EDJqERAU5up6wjeVoRE6WM2OoIsUT3ouxVRKUmjX38b4k0-q6t_UHei"
};
 
 
// 2. Create two collections to save our payments and the Paypal tokens.
 
 
this.PaypalPayments = new Meteor.Collection('paypal_payments');

this.PaypalTokens = new Meteor.Collection('paypal_tokens');
 
 
// # 3. Create the three methods to:
// #    - Get a valid token to make API calls. (retrieve a new one if invalid)
// #    - Create a payment
// #    - Execute a payment.
 
 
Meteor.methods({
  'getPaypalToken': function() {
    var auth, isTokenValid, token;
    isTokenValid = 0;
    token = PaypalTokens.findOne({
      timestamp: {
        $exists: true
      }
    }, {
      sort: {
        timestamp: -1
      }
    });
    if (token != null) {
      isTokenValid = Math.ceil((new Date().getTime() - token.timestamp) / 1000);
    }
    if (isTokenValid === 0 || isTokenValid > token.expires_in) {
      auth = paypalConf['clientId'] + ':' + paypalConf['clientSecret'];
      token = EJSON.parse(Meteor.http.post('https://api.sandbox.paypal.com/v1/oauth2/token', {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US'
        },
        auth: auth,
        params: {
          'grant_type': 'client_credentials'
        }
      }).content);
      token['timestamp'] = new Date().getTime();
      PaypalTokens.insert(token);
    }
    return token;
  },
  'createPaypalPayment': function(product) {
    var payment, res, token;
    token = Meteor.call('getPaypalToken');
    payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/dashboard/payment/paypal/execute',
        cancel_url: 'http://localhost:3000/dashboard'
      },
      transactions: [
        {
          item_list: {
            'items': [
              {
                'name': product.name,
                'price': product.price,
                'currency': 'USD',
                'quantity': 1
              }
            ]
          },
          amount: {
            total: product.price,
            currency: 'USD'
          },
          description: product.description
        }
      ]
    };
    res = Meteor.http.post('https://api.sandbox.paypal.com/v1/payments/payment', {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      },
      data: payment
    });
    res.data['userId'] = this.userId;
    PaypalPayments.insert(res.data);
    return res.data;
  },
  'executePaypalPayment': function(payerId) {
    var payment, res, token, url;
    payment = PaypalPayments.findOne({
      userId: this.userId
    }, {
      sort: {
        'create_time': -1
      }
    });
    token = Meteor.call('getPaypalToken');
    url = 'https://api.sandbox.paypal.com/v1/payments/payment/' + payment.id + '/execute';
    res = Meteor.http.post(url, {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      },
      data: {
        payer_id: payerId
      }
    });
    payment = res.data;
    payment['userId'] = this.userId;
    if (payment.state === 'approved') {
      PaypalPayments.insert(payment);
    }
    if (payment.state === 'approved') {
      return true;
    } else {
      return false;
    }
  }
});
