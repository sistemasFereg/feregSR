import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import MainMenu from '../scenes/mainMenu/mainMenu';

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

const MenuStackScreen = ({navigation}) => (
  <MenuStack.Navigator initialRouteName='MainMenu' screenOptions={options}>
    <MenuStack.Screen name="MainMenu" 
      options={{ 
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
      }}>
      {(props) => <MainMenu {...props} />}
    </MenuStack.Screen>
    {/* <HomeStack.Screen name="Finance" 
      options={{ 
        headerBackTitleVisible: false,
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
        headerRight: () => (
          <Ionicons.Button 
            name="ios-menu" 
            size={35} 
            color={COLORS.darkPrimary}
            backgroundColor={COLORS.lightGray}
            onPress={() => navigation.openDrawer()}>
          </Ionicons.Button>
        )
      }}>
      {(props) => <Finance {...props} />}
    </HomeStack.Screen> */}
  </MenuStack.Navigator>
);

export {
  MenuStackScreen,
}
