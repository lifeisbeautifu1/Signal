import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  AddChatScreen,
  ChatScreen,
} from './screens';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          options={{ title: 'Login' }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ title: 'Register' }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ title: 'Home' }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ title: 'Create Chat' }}
          name="AddChat"
          component={AddChatScreen}
        />
        <Stack.Screen
          options={{ title: 'Chat' }}
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});
