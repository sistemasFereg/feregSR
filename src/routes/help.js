import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import Help from '../scenes/help/help';


const HelpStack = createStackNavigator();

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

const HelpStackScreen = ({navigation}) => (
  <HelpStack.Navigator screenOptions={options}>
    <HelpStack.Screen name="Inicio" component={Help} options={{
      headerBackTitleVisible: false,
      headerTintColor: COLORS.darkPrimary,
      headerTitle: props => <LogoTitle {...props} />,
      headerLeft: null,
      headerRight: () => (
        <Ionicons.Button 
          name="ios-menu" 
          size={35} 
          color={COLORS.darkPrimary}
          backgroundColor={COLORS.lightGray}
          onPress={() => navigation.openDrawer()}>
        </Ionicons.Button>
      )
    }} />
  </HelpStack.Navigator>
);

export {
  HelpStackScreen,
}
