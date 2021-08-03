import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import MainMenu from '../scenes/mainMenu/mainMenu';

const HomeStack = createStackNavigator();

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

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={options}>
    <Stack.Screen name="Inicio" 
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
    </Stack.Screen>
  </HomeStack.Navigator>
);

export {
  HomeStackScreen,
}
