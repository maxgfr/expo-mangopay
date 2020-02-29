import { AuthSession } from 'expo';

const RETURN_URL= AuthSession.getRedirectUrl();
const BASE_URL="http://localhost:3000/";

export default class MangoConnector {

    static myInstance = null;

    /**
    * @returns {MangoConnector}
    */
    static getInstance() {
        if (MangoConnector.myInstance == null) {
            MangoConnector.myInstance = new MangoConnector();
        }
        return this.myInstance;
    }

    createNaturalUser(first_name, last_name, address, city, region, postal_code, country, birthday, nationality, country_of_residence, email) {
      return new Promise((resolve, reject) => {
        var body = {
          first_name: first_name,
          last_name: last_name,
          address: address,
          city: city,
          region: region,
          postal_code: postal_code,
          country: country,
          birthday: birthday,
          nationality: nationality,
          country_of_residence: country_of_residence,
          email: email
        }
        fetch(BASE_URL+"createNaturalUser", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    createWallet(owners, description, currency) {
      return new Promise((resolve, reject) => {
        var body = {
          owners: owners,
          description: description,
          currency: currency
        }
        fetch(BASE_URL+"createWallet", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    addBankAccount(user_id, owner_name, iban, bic, address, city, region, postal_code, country){
      return new Promise((resolve, reject) => {
        var body = {
          user_id: user_id,
          owner_name: owner_name,
          iban: iban,
          bic: bic,
          address: address,
          city: city,
          region: region,
          postal_code: postal_code,
          country: country
        }
        fetch(BASE_URL+"addBankAccount", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    createCardRegistration(user_id, currency) {
      return new Promise((resolve, reject) => {
        var body = {
          user_id: user_id,
          currency: currency
        }
        fetch(BASE_URL+"createCardRegistration", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    postCardInfo(cardAccessKey, cardRegistrationURL, preregistrationData, cardNumber, cardExpirationDate, cardCvx) {
      return new Promise((resolve, reject) => {
        var body = `accessKeyRef=${cardAccessKey}&data=${preregistrationData}&cardNumber=${cardNumber}&cardExpirationDate=${cardExpirationDate}&cardCvx=${cardCvx}`;
        //console.log(body);
        fetch(cardRegistrationURL, {
          body: body,
          headers: { 'Content-type': 'x-www-form-urlencoded' },
          method: "POST"
        }).then((response) => response.text()).then((responseText) => resolve(responseText)).catch((err) => reject(err));
      });
    }

    updateCardRegistration(card_registration_object, registration_data) {
      return new Promise((resolve, reject) => {
        card_registration_object["RegistrationData"] = registration_data;
        var body = {
          card_registration_object: card_registration_object
        }
        fetch(BASE_URL+"updateCardRegistration", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    updateCardRegistration(card_registration_object, registration_data) {
      return new Promise((resolve, reject) => {
        card_registration_object["RegistrationData"] = registration_data;
        var body = {
          card_registration_object: card_registration_object
        }
        fetch(BASE_URL+"updateCardRegistration", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    getCardRegistration(card_registration_id) {
      return new Promise((resolve, reject) => {
        var body = {
          card_registration_id: card_registration_id
        }
        fetch(BASE_URL+"getCardRegistration", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    createPreAuthorization(author_id, debited_currency, debited_amount, card_id, statement_descriptor) {
      return new Promise((resolve, reject) => {
        var body = {
          author_id: author_id,
          debited_currency: debited_currency,
          debited_amount: debited_amount,
          card_id: card_id,
          return_url: RETURN_URL,
          statement_descriptor: statement_descriptor
        }
        fetch(BASE_URL+"createPreAuthorization", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    createDirectPayin(author_id, credited_user_id, wallet_id, debited_currency, debited_amount, fee_currency, fee_amount, preauthorization_id, payment_type, execution_type, card_id) {
      return new Promise((resolve, reject) => {
        var body = {
          author_id: author_id,
          credited_user_id: credited_user_id,
          wallet_id: wallet_id,
          debited_currency: debited_currency,
          debited_amount: debited_amount,
          fee_currency: fee_currency,
          fee_amount: fee_amount,
          preauthorization_id: preauthorization_id,
          payment_type: payment_type,
          execution_type: execution_type,
          return_url: RETURN_URL,
          card_id: card_id
        }
        fetch(BASE_URL+"createDirectPayin", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    refund(payin_id, author_id, debited_currency, debited_amount, fee_currency, fee_amount) {
      return new Promise((resolve, reject) => {
        var body = {
          payin_id: payin_id,
          author_id: author_id,
          debited_currency: debited_currency,
          debited_amount: debited_amount,
          fee_currency: fee_currency,
          fee_amount: fee_amount
        }
        fetch(BASE_URL+"refund", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    transfer(author_id, credited_user_id, debited_currency, debited_amount, fee_currency, fee_amount, debited_wallet_id, credited_wallet_id) {
      return new Promise((resolve, reject) => {
        var body = {
          author_id: author_id,
          credited_user_id: credited_user_id,
          debited_currency: debited_currency,
          debited_amount: debited_amount,
          fee_currency: fee_currency,
          fee_amount: fee_amount,
          debited_wallet_id: debited_wallet_id,
          credited_wallet_id: credited_wallet_id
        }
        fetch(BASE_URL+"transfer", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    transferRefund(transfer_id, author_id, debited_currency, debited_amount, fee_currency, fee_amount) {
      return new Promise((resolve, reject) => {
        var body = {
          transfer_id: transfer_id,
          author_id: author_id,
          debited_currency: debited_currency,
          debited_amount: debited_amount,
          fee_currency: fee_currency,
          fee_amount: fee_amount
        }
        fetch(BASE_URL+"transferRefund", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    payout(author_id, debited_currency, debited_amount, fee_currency, fee_amount, bank_account_id, debited_wallet_id, bank_wire_ref) {
      return new Promise((resolve, reject) => {
        var body = {
          author_id: author_id,
          debited_currency: debited_currency,
          debited_amount: debited_amount,
          fee_currency: fee_currency,
          fee_amount: fee_amount,
          bank_account_id: bank_account_id,
          debited_wallet_id: debited_wallet_id,
          bank_wire_ref: bank_wire_ref
        }
        fetch(BASE_URL+"payout", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }

    addKYCDoc(type, user_id, file_base64_encoded) {
      return new Promise((resolve, reject) => {
        var body = {
          type: type,
          user_id: user_id,
          file_base64_encoded: file_base64_encoded
        }
        fetch(BASE_URL+"addKYCDoc", {
          body: JSON.stringify(body),
          headers: { 'Content-type': 'application/json' },
          method: "POST"
        }).then((response) => response.json()).then((responseJson) => resolve(responseJson)).catch((err) => reject(err));
      });
    }
}
