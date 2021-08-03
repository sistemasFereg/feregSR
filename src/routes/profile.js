import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import Profile from '../scenes/profile/profile';

const ProfileStack = createStackNavigator();

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
      style={{ 
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
      }}
      source={require('../assets/images/feregIcon.png')}
    />
  );
}

const ProfileStackScreen = ({navigation, user}) => (
  <ProfileStack.Navigator screenOptions={options}>
    <ProfileStack.Screen name="Perfil" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
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
      {(props) => <Profile {...props} user={user}/>}
    </ProfileStack.Screen>
  </ProfileStack.Navigator>
);

export {
  ProfileStackScreen,
}
