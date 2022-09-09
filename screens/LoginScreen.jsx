import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';

import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('Home');
        // dispatch(
        //   login({
        //     name: user.displayName,
        //     email: user.email,
        //     uid: user.uid,
        //   })
        // );
      } else {
        // dispatch(logout());
      }
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // dispatch(
      //   login({
      //     displayName: user.displayName,
      //     email: user.email,
      //     uid: user.uid,
      //   })
      // );
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png',
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoFocus
          type="email"
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          type="password"
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
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

export default LoginScreen;
