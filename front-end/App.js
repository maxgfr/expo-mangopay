import React, { useState, useEffect } from 'react';
import { ScrollView, Button, Text } from 'react-native';
import MangoConnector from './lib/mango';

export default function App() {

  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
  }, [])

  _onCreateCustomer = () => {

  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>

      <Button onPress={_onCreateCustomer} title="Create a customer"/>
      <Text>{customerId}</Text>

    </ScrollView>
  );
}
