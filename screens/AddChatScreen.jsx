import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from '@rneui/base';
import { useLayoutEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addDoc } from 'firebase/firestore';

import { chatsCol } from '../firebase';

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      await addDoc(chatsCol, {
        chatName: input,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Input
        value={input}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        onChangeText={(text) => setInput(text)}
        placeholder="Enter a chat name"
      />
      <Button disabled={!input} onPress={createChat} title="Create new chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});
