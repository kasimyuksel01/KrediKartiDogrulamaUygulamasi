import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { isValidCreditCard } from 'dogrulama';

export default function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [formattedCardNumber, setFormattedCardNumber] = useState('');
  const [isValid, setIsValid] = useState(null);

  const formatCardNumber = (input) => {
    // Girilen numarayı yalnızca rakam olarak al, her 4 karakterde bir boşluk ekleyerek düzenle
    const numbersOnly = input.replace(/\D/g, '');
    return numbersOnly.replace(/(\d{4})/g, '$1 ').trim();
  };

  const validateCard = () => {
    const cleanedCardNumber = cardNumber.replace(/\D/g, ''); // Girilen numaradan tüm harf ve boşlukları kaldır

    if (/^[0-9]{16}$/.test(cleanedCardNumber)) {
      const isValidCard = isValidCreditCard(cleanedCardNumber);
      setIsValid(isValidCard);
    } else {
      setIsValid(false);
    }
  };

  const handleCardNumberChange = (text) => {
    const formatted = formatCardNumber(text);
    setFormattedCardNumber(formatted);
    setCardNumber(formatted.replace(/\s+/g, ''));
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/atg.png')} style={styles.logo} />
      <Text style={styles.text} >Kredi Kartı Numarası (16 Hane):</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleCardNumberChange}
        value={formattedCardNumber}
        keyboardType="number-pad"
        maxLength={19} // 16 rakam ve 3 boşluk
      />
      <Button title="Doğrula" onPress={validateCard} />
      {isValid !== null && (
        <Text style={isValid ? styles.valid : styles.invalid}>
          {isValid ? 'Geçerli' : 'Geçersiz'} kredi kartı
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  logo: {
    width: 400,
    height: 111,
    marginBottom: 50,
  },
  input: {
    width: 200,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  valid: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },
  invalid: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
