import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import HelpResident from '../scenes/resident/helpResident/helpResident';

const MenuStack = createStackNavigator();

const options = {
  headerStyle: {
    backgroundColor: COLORS.lightGray,
  },
  headerTintColor: COLORS.darkPrimary,
  headerTitleStyle: {
    fontWeight: "bold",
  }
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 40 }}
      source={require('../assets/images/logoFereg.png')}
    />
  );
}

const HelpMenuStackScreen = ({navigation, user, condominium}) => (
  <MenuStack.Navigator initialRouteName='HelpMenu' screenOptions={options}>
    <MenuStack.Screen name="HelpMenu" 
      options={{ 
        headerShown: false
      }}>
      {(props) => <HelpResident {...props} user={user} condominium={condominium}/>}
    </MenuStack.Screen>
  </MenuStack.Navigator>
);

export {
  HelpMenuStackScreen,
}
