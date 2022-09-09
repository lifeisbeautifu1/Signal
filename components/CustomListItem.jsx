import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from '@rneui/base';
import React from 'react';

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: 'https://st4.depositphotos.com/9998432/23259/v/600/depositphotos_232591962-stock-illustration-person-gray-photo-placeholder-man.jpg',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>
          Youtube Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          This is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
