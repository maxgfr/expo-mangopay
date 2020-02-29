const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
const mangopay = require('mangopay2-nodejs-sdk');
const app = express();
const PORT = 3000;
const MANGO_API_URL = "https://api.sandbox.mangopay.com" // 'https://api.mangopay.com'
const MANGO_CLIENT_ID = process.env.MANGOPAY_CLIENT_ID;
const MANGO_CLIENT_API_KEY = process.env.MANGOPAY_API_KEY;
const MANGO_API_VERSION = "v2.01";
const MangoApi = new mangopay({
    clientId: MANGO_CLIENT_ID,
    clientApiKey: MANGO_CLIENT_API_KEY,
    baseUrl: MANGO_API_URL
});

app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb', extended: true})); // parse application/json
app.use(cors());

app.get('/', (req, res, next) => {
  res.json({success: true});
})

app.post('/createNaturalUser', (req, res, next) => {
  MangoApi.Users.create({
    "FirstName": req.body.first_name,
    "LastName": req.body.last_name,
    "Address": {
      "AddressLine1": req.body.address,
      "City": req.body.city,
      "Region": req.body.region,
      "PostalCode": req.body.postal_code,
      "Country": req.body.country
    },
    "Birthday": req.body.birthday,
    "Nationality": req.body.nationality,
    "CountryOfResidence": req.body.country_of_residence,
    "PersonType": "NATURAL",
    "Email": req.body.email
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/createWallet', (req, res, next) => {
  MangoApi.Wallets.create({
    "Owners": req.body.owners, // ['73723']
    "Description": req.body.description,
    "Currency": req.body.currency
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/addBankAccount', (req, res, next) => {
  MangoApi.Users.createBankAccount(req.body.user_id, {
    "OwnerAddress": {
      "AddressLine1": req.body.address,
      "City": req.body.city,
      "Region": req.body.region,
      "PostalCode": req.body.postal_code,
      "Country": req.body.country
    },
    "OwnerName": req.body.owner_name,
    "IBAN": req.body.iban,
    "BIC": req.body.bic,
    "Type": "IBAN"
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/createCardRegistration', (req, res, next) => {
  MangoApi.CardRegistrations.create({
    "UserId": req.body.user_id,
    "Currency": req.body.currency
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/updateCardRegistration', (req, res, next) => {
  MangoApi.CardRegistrations.update(req.body.card_registration_object)
  .then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/getCardRegistration', (req, res, next) => {
  MangoApi.CardRegistrations.get(req.body.card_registration_id)
  .then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/createPreAuthorization', (req, res, next) => {
  MangoApi.CardPreAuthorizations.create({
    "AuthorId": req.body.author_id,
    "DebitedFunds": {
      "Currency": req.body.debited_currency,
      "Amount": req.body.debited_amount
    },
    "CardId": req.body.card_id,
    "SecureModeReturnURL": req.body.return_url,
    "StatementDescriptor": req.body.statement_descriptor
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/createDirectPayin', (req, res, next) => {
  MangoApi.PayIns.create({
    "PaymentType": req.body.payment_type,
    "ExecutionType": req.body.execution_type,
    "AuthorId": req.body.author_id,
    "CreditedUserId": req.body.credited_user_id,
    "CreditedWalletId": req.body.wallet_id,
    "DebitedFunds": {
      "Currency": req.body.debited_currency,
      "Amount": req.body.debited_amount
    },
    "Fees": {
      "Currency": req.body.fee_currency,
      "Amount": req.body.fee_amount,
    },
    "PreauthorizationId": req.body.preauthorization_id,
    "SecureModeReturnURL": req.body.return_url,
    "CardId": req.body.card_id
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/refund', (req, res, next) => {
  MangoApi.PayIns.createRefund(req.body.payin_id, {
    "AuthorId": req.body.author_id,
    "DebitedFunds": {
      "Currency": req.body.debited_currency,
      "Amount": req.body.debited_amount
    },
    "Fees": {
      "Currency": req.body.fee_currency,
      "Amount": req.body.fee_amount,
    }
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/transfer', (req, res, next) => {
  MangoApi.Transfers.create({
    "AuthorId": req.body.author_id,
    "CreditedUserId": req.body.credited_user_id,
    "DebitedFunds": {
      "Currency": req.body.debited_currency,
      "Amount": req.body.debited_amount
    },
    "Fees": {
      "Currency": req.body.fee_currency,
      "Amount": req.body.fee_amount
    },
    "DebitedWalletId": req.body.debited_wallet_id,
    "CreditedWalletId": req.body.credited_wallet_id
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/transferRefund', (req, res, next) => {
  MangoApi.Transfers.createRefund(req.body.transfer_id, {
    "AuthorId": req.body.author_id,
    "DebitedFunds": {
      "Currency": req.body.debited_currency,
      "Amount": req.body.debited_amount
    },
    "Fees": {
      "Currency": req.body.fee_currency,
      "Amount": req.body.fee_amount
    }
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/payout', (req, res, next) => {
  MangoApi.PayOuts.create({
    "AuthorId": req.body.author_id,
    "DebitedFunds": {
      "Currency": req.body.debited_currency,
      "Amount": req.body.debited_amount
    },
    "Fees": {
      "Currency": req.body.fee_currency,
      "Amount": req.body.fee_amount
    },
    "BankAccountId": req.body.bank_account_id,
    "DebitedWalletId": req.body.debited_wallet_id,
    "BankWireRef": req.body.bank_wire_ref,
    "PaymentType": "BANK_WIRE"
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.post('/addKYCDoc', (req, res, next) => {
  var ressource_id = '';
  MangoApi.Users.createKycDocument(req.body.user_id, {
    "Type": req.body.type
  }).then((resultat) => {
    console.log(resultat)
    ressource_id = resultat.Id;
    /*return fetch(MANGO_API_URL+`/${MANGO_API_VERSION}/${MANGO_CLIENT_ID}/users/${resultat.UserId}/kyc/documents/${resultat.Id}/pages/`, {
      body: JSON.stringify({"File": base64_file}),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(MANGO_CLIENT_ID + ':' + MANGO_CLIENT_API_KEY).toString('base64')),
        'Content-Type': 'application/json'
      },
      method: "POST"
    })
    */
    var KycPage = new MangoApi.models.KycPage({
      "File": req.body.file_base64_encoded
    });
    return MangoApi.Users.createKycPage(resultat.UserId, resultat.Id, KycPage)
  })
  .then((resultat) => {
    console.log(resultat)
    return MangoApi.Users.updateKycDocument(req.body.user_id, {
      "Id": ressource_id,
      "Status": "VALIDATION_ASKED"
    });
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err);
    res.json(err);
  });
});

app.listen(PORT, () => console.log(`The application is listening on port ${PORT}!`))
