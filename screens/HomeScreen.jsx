import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

const HomeScreen = () => {
  useEffect(() => {
    console.log('hello');
  }, []);
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView>
        <Text>HomeScreen</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit aperiam
          blanditiis modi, velit repellendus fuga alias delectus quas dolorum
          quibusdam! Beatae ducimus illum consectetur veritatis harum nisi omnis
          impedit suscipit unde vel repellendus rerum, doloremque nobis fugiat
          iste enim recusandae porro! Unde vero adipisci iure expedita, tenetur
          ex dolore asperiores.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
