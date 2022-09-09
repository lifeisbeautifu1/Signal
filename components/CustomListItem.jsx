import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from '@rneui/base';
import { useLayoutEffect, useState } from 'react';
import {
  doc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

import { db } from '../firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useLayoutEffect(() => {
    const docRef = doc(db, 'chats', id);
    const messagesRef = collection(docRef, 'messages');
    const messagesRef2 = query(messagesRef, orderBy('timestamp'));
    const unsubscribe = onSnapshot(messagesRef2, (snapshot) => {
      setChatMessages(
        snapshot?.docs?.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.at(-1)?.data?.photoURL ||
            'https://st4.depositphotos.com/9998432/23259/v/600/depositphotos_232591962-stock-illustration-person-gray-photo-placeholder-man.jpg',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.at(-1)?.data?.displayName}:{' '}
          {chatMessages?.at(-1)?.data?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};;;;

export default CustomListItem;

const styles = StyleSheet.create({});
