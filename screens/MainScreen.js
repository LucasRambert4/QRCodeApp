// MainScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext'; // Importez le hook useUser

const MainScreen = () => {
  const { setUser } = useUser(); // Utilisez le hook pour récupérer setUser
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleGenerateQR = () => {
    if (!firstName || !lastName) {
      Alert.alert('Erreur', 'Veuillez remplir les champs nom et prénom');
    } else {
      setUser({ firstName, lastName }); // Enregistrez les infos dans le store global
      navigation.navigate('QRCode'); // Naviguez vers l'écran QR Code
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nom</Text>
      <TextInput 
        style={styles.input} 
        value={firstName} 
        onChangeText={setFirstName} 
        placeholder="Entrez votre prénom" 
      />
      <Text>Prénom</Text>
      <TextInput 
        style={styles.input} 
        value={lastName} 
        onChangeText={setLastName} 
        placeholder="Entrez votre nom" 
      />
      <Button title="Générer le QR Code" onPress={handleGenerateQR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
});

export default MainScreen;
