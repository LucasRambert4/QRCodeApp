import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import Animated, { SlideInUp, withSpring } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const MainScreen = () => {
  const { setUser } = useUser();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showFields, setShowFields] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // Track focused field

  useEffect(() => {
    // Change showFields to true after 2 seconds
    const timer = setTimeout(() => {
      setShowFields(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, []);

  const handleGenerateQR = () => {
    if (!firstName || !lastName) {
      Alert.alert('Erreur', 'Veuillez remplir les champs nom et prénom');
    } else {
      setUser({ firstName, lastName });
      navigation.navigate('QRCode');
    }
  };

  // Handle focus animation
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <View style={styles.container}>
      {/* Loader with Lottie Animation */}
      {!showFields && (
        <LottieView
          source={require('../assets/lottie/scan-animation.json')}
          autoPlay
          loop // Keep the animation looping
          style={styles.lottie}
          speed={2} // Set animation speed to make it last 2 seconds
        />
      )}

      {/* Input Fields and Button */}
      {showFields && (
        <Animated.View entering={SlideInUp.duration(500)} style={styles.fieldsContainer}>
          <Text>Nom</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'firstName' && { 
                borderColor: 'blue', 
                transform: [{ scale: 1.06 }] // Corrected scale animation
              },
            ]}
          >
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Entrez votre prénom"
              onFocus={() => handleFocus('firstName')}
              onBlur={handleBlur}
            />
          </Animated.View>

          <Text>Prénom</Text>
          <Animated.View
            style={[
              styles.inputContainer,
              focusedField === 'lastName' && { 
                borderColor: 'blue', 
                transform: [{ scale: 1.06 }] // Corrected scale animation
              },
            ]}
          >
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Entrez votre nom"
              onFocus={() => handleFocus('lastName')}
              onBlur={handleBlur}
            />
          </Animated.View>

          <Button title="Générer le QR Code" onPress={handleGenerateQR} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  lottie: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  fieldsContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden', // To make sure the border radius works properly
  },
  input: {
    height: 40,
    paddingLeft: 8,
  },
});

export default MainScreen;
