import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import DisableResident from '../scenes/manager/resident/disableResident/disableResident';

const DisableStack = createStackNavigator();

const options = {
  headerStyle: {
    backgroundColor: COLORS.darkGray,
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

const DisabletackScreen = ({navigation, user}) => (
  <DisableStack.Navigator screenOptions={options}>
    <DisableStack.Screen name="Disable" 
      options={{ 
        headerBackTitleVisible: false,
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
        //headerLeft: null,
        headerRight: () => (
          <Ionicons.Button 
            name="ios-menu" 
            size={35} 
            color={COLORS.darkPrimary}
            backgroundColor={COLORS.darkGray}
            onPress={() => navigation.openDrawer()}>
          </Ionicons.Button>
        )
      }}>
      {(props) => <DisableResident {...props} user={user}/>}
    </DisableStack.Screen>
  </DisableStack.Navigator>
);

export {
  DisabletackScreen,
}
