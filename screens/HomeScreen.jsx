import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { useLayoutEffect } from 'react';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import { CustomListItem } from '../components';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const HomeScreen = ({ navigation }) => {
  const signOutUser = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 80,
          }}
        >
          <TouchableOpacity style={{ marginRight: 20 }} activeOpacity={0.5}>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddChat')}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
