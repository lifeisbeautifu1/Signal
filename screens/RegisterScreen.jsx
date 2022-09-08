import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useState, useLayoutEffect } from 'react';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  const register = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            imageUrl ||
            'https://st4.depositphotos.com/9998432/23259/v/600/depositphotos_232591962-stock-illustration-person-gray-photo-placeholder-man.jpg',
        });
      }
      // dispatch(
      //   login({
      //     displayName: name,
      //     email: user.email,
      //     uid: user.uid,
      //   })
      // );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          autoFocus
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={register}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default RegisterScreen;
