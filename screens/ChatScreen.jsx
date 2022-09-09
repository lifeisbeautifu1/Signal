import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLayoutEffect, useState } from 'react';
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { chatsCol, db, auth } from '../firebase';

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data?.photoURL ||
                'https://st4.depositphotos.com/9998432/23259/v/600/depositphotos_232591962-stock-illustration-person-gray-photo-placeholder-man.jpg',
            }}
          />
          <Text style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            width: 80,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity style={{ marginRight: 20 }}>
            <FontAwesome name="video-camera" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = async () => {
    if (input) {
      Keyboard.dismiss();
      const docRef = doc(db, 'chats', route.params.id);
      const messagesRef = collection(docRef, 'messages');
      addDoc(messagesRef, {
        message: input,
        displayName: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email,
        photoURL: auth?.currentUser?.photoURL,
        timestamp: serverTimestamp(),
      });
      setInput('');
    }
  };

  useLayoutEffect(() => {
    const docRef = doc(db, 'chats', route.params.id);
    const messagesRef = collection(docRef, 'messages');
    const messagesRef2 = query(messagesRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(messagesRef2, (snapshot) => {
      setMessages(
        snapshot?.docs?.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email == auth?.currentUser?.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{
                        uri: data?.photoURL,
                      }}
                    />
                    <Text style={styles.recieverText}>{data?.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      rounded
                      bottom={-15}
                      left={-5}
                      size={30}
                      source={{
                        uri: data?.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data?.message}</Text>
                    <Text style={styles.senderName}>{data?.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                placeholder="Signal Message"
                onSubmitEditing={sendMessage}
                style={styles.textInput}
                onChangeText={(text) => setInput(text)}
              ></TextInput>
              <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <Ionicons color="#2b68e6" name="send" size={24} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ececec',
    padding: 10,
    color: 'grey',
    borderRadius: 30,
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
  },
  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  recieverText: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
});
