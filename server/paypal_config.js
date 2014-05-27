paypalConf = {
  host: "api.sandbox.paypal.com",
  clientId: "AfReXBAKk5i0Fv0_FXqrwhAb7vrkQYbqpHzkQ99ARkj4KyUPSK1cqjxwHeWK",
  clientSecret: "EJi9xBDsJQDXesjxZI-WuJ6tPUvC3BciUhP1N9dobENyH3TYnx4euKbSAUbb"
};

// PaypalPayments = new Meteor.Collection('paypal_payments');

// PaypalTokens = new Meteor.Collection('paypal_tokens');

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
    console.log(token);
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
    console.log(payerId);
    var payment, res, token, url, _ref;
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
    if ((_ref = payment.state) === 'approved' || _ref === 'pending') {
      PaypalPayments.insert(payment);
    }
    if (payment.state === 'approved') {
      return true;
    } else {
      return false;
    }
  }
});
