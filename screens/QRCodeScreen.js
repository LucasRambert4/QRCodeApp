// QRCodeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useUser } from '../context/UserContext'; // Importez le hook useUser

const QRCodeScreen = () => {
  const { user } = useUser(); // Utilisez le hook pour accéder aux infos de l'utilisateur

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{`Nom: ${user.firstName} ${user.lastName}`}</Text>
      <QRCode value={`${user.firstName} ${user.lastName}`} size={200} />
    </View>
  );
};

export default QRCodeScreen;
