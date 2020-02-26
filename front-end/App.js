import React, { useState, useEffect } from 'react';
import { ScrollView, Button, Text } from 'react-native';
import MangoConnector from './lib/mango';

export default function App() {

  const [naturalUserId, setNaturalUserId] = useState('');
  const [otherNaturalUserId, setOtherNaturalUserId] = useState('');
  const [walletId, setWalletId] = useState('');
  const [otherWalletId, setOtherWalletId] = useState('');
  const [bankAccountId, setBankAccountId] = useState('');
  const [cardRegistrationId, setCardRegistrationId] = useState('');
  const [cardAccessKey, setCardAccessKey] = useState('');
  const [cardRegistrationURL, setCardRegistrationURL] = useState('');
  const [preregistrationData, setPreregistrationData] = useState('');
  const [postCardInfoId, setPostCardInfoId] = useState('');
  const [updateCardRegistrationId, setUpdateCardRegistrationId] = useState('');
  const [cardRegistrationObject, setCardRegistrationObject] = useState({});
  const [cardId, setCardId] = useState('');
  const [preAuthorizationId, setPreAuthorizationId] = useState('');
  const [payinId, setPayinId] = useState('');
  const [refundId, setRefundId] = useState('');

  useEffect(() => {
  }, [])

  _onCreateNaturalUser = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createNaturalUser("Maxime", "Golfier", "Place de la Concorde", "Paris", "IDF", '75001', "FR", 1463496101, "FR", "FR", "maxime@gmail.com").then((res) => {
      //console.log(res);
      setNaturalUserId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onCreateOtherNaturalUser = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createNaturalUser("Max", "Gfr", "Place Inconnu", "Paris", "IDF", '75001', "FR", 1463496101, "FR", "FR", "max@gmail.com").then((res) => {
      //console.log(res);
      setOtherNaturalUserId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onCreateWallet = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createWallet([ naturalUserId ], "Description", "EUR").then((res) => {
      //console.log(res);
      setWalletId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onCreateOtherWallet = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createWallet([ otherNaturalUserId ], "Description", "EUR").then((res) => {
      //console.log(res);
      setOtherWalletId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onAddBankAccount = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.addBankAccount(naturalUserId, "Maxime Gfr", "FR7630004000031234567890143", "CRLYFRPP", "1 Mangopay Street", "Paris", "IDF", "75001", "FR").then((res) => {
      //console.log(res);
      setBankAccountId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onCardRegistration = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createCardRegistration(naturalUserId, "EUR").then((res) => {
      //console.log(res);
      setCardRegistrationId(res.Id)
      setCardRegistrationObject(res)
      setCardAccessKey(res.AccessKey)
      setCardRegistrationURL(res.CardRegistrationURL)
      setPreregistrationData(res.PreregistrationData)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onPostCardInfo = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.postCardInfo(cardAccessKey, cardRegistrationURL, preregistrationData, "4706750000000009", "1222", "123").then((res) => {
      //console.log(res);
      setPostCardInfoId(res)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onUpdateCardRegistration = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.updateCardRegistration(cardRegistrationObject, postCardInfoId).then((res) => {
      //console.log(res);
      setCardId(res.CardId)
    }).catch((err) => {
      console.log(err);
    })
  }

  // useless
  _getCardRegistration = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.getCardRegistration(cardRegistrationId).then((res) => {
      //console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  _onCreatePreAuthorization = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createPreAuthorization(naturalUserId, "EUR", 1000, cardId, "Payment").then((res) => { // 10 characters payment
      //console.log(res);
      setPreAuthorizationId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onCreateDirectPayin = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createDirectPayin(naturalUserId, otherNaturalUserId, walletId, "EUR", 1000, "EUR", 100, preAuthorizationId, "CARD", "DIRECT", cardId).then((res) => {
      //console.log(res);
      setPayinId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onRefund = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.refund(payinId, naturalUserId, "EUR", 900, "EUR", 0).then((res) => {
      //console.log(res);
      setRefundId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onTransfer = () => {
    let mangopay = MangoConnector.getInstance();
    mangopay.createNaturalUser(otherNaturalUserId, naturalUserId, "EUR", 200, "EUR", 0, debited_wallet_id, credited_wallet_id).then((res) => {
      //console.log(res);
      setNaturalUserId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onTransferRefund = () => {
    transferRefund(transfer_id, author_id, debited_currency, debited_amount, fee_currency, fee_amount)
    let mangopay = MangoConnector.getInstance();
    mangopay.createNaturalUser("Maxime", "Golfier", "Place de la Concorde", "Paris", "IDF", '75001', "FR", 1463496101, "FR", "FR", "maxime@gmail.com").then((res) => {
      //console.log(res);
      setNaturalUserId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onPayout = () => {
    payout(author_id, debited_currency, debited_amount, fee_currency, fee_amount, bank_account_id, debited_wallet_id, bank_wire_ref)
    let mangopay = MangoConnector.getInstance();
    mangopay.createNaturalUser("Maxime", "Golfier", "Place de la Concorde", "Paris", "IDF", '75001', "FR", 1463496101, "FR", "FR", "maxime@gmail.com").then((res) => {
      //console.log(res);
      setNaturalUserId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  _onAddKYCDoc = () => {
    addKYCDoc(type, user_id, doc)
    let mangopay = MangoConnector.getInstance();
    mangopay.createNaturalUser("Maxime", "Golfier", "Place de la Concorde", "Paris", "IDF", '75001', "FR", 1463496101, "FR", "FR", "maxime@gmail.com").then((res) => {
      //console.log(res);
      setNaturalUserId(res.Id)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 }}>

      <Button onPress={_onCreateNaturalUser} title="1.1 - Create customer 1"/>
      <Text>{naturalUserId}</Text>

      <Button onPress={_onCreateOtherNaturalUser} title="1.2 - Create customer 2"/>
      <Text>{otherNaturalUserId}</Text>

      <Button onPress={_onCreateWallet} title="2.1 - Create wallet 1"/>
      <Text>{walletId}</Text>

      <Button onPress={_onCreateOtherWallet} title="2.2 - Create wallet 2"/>
      <Text>{otherWalletId}</Text>

      <Button onPress={_onAddBankAccount} title="3 - Add a bank account"/>
      <Text>{bankAccountId}</Text>

      <Button onPress={_onCardRegistration} title="4 - Card Registration"/>
      <Text>{cardRegistrationId}</Text>

      <Button onPress={_onPostCardInfo} title="5 - Post Card Info"/>
      <Text>{postCardInfoId}</Text>

      <Button onPress={_onUpdateCardRegistration} title="6 - Update Card Registration"/>
      <Text>{cardId}</Text>

      <Button onPress={_onCreatePreAuthorization} title="7 - Create PreAuthorization"/>
      <Text>{preAuthorizationId}</Text>

      <Button onPress={_onCreateDirectPayin} title="8 - Create a Direct Payin"/>
      <Text>{payinId}</Text>

      <Button onPress={_onRefund} title="9 - Refund"/>
      <Text>{refundId}</Text>






    </ScrollView>
  );
}
