import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Image
} from 'react-native';
// Scenes
import Login from '../scenes/auth/login/login';
import RecoverPassword from '../scenes/recover-password/recoverPassword';
import { COLORS } from '../assets/styles/variables';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ 
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        width: 50,
        height: 50,
      }}
      source={require('../assets/images/feregIcon.png')}
    />
  );
}

const AuthStackNav = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" options={{ headerShown: false }}>
      {(props) => <Login {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="RecoverPassword"
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTintColor: COLORS.darkPrimary,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: COLORS.darkGray
        }
      }}
    >
      {(props) => <RecoverPassword {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthStackNav;
