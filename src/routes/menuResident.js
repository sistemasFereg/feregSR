import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import ResidentMenu from '../scenes/resident/residentMenu/residentMenu';
import Invitation from '../scenes/resident/invitation/invitation';
import ExternalService from '../scenes/resident/externalService/externalService';
import { HelpMenuStackScreen } from './helpMenu';
import CreateSuggestion from '../scenes/suggestion/createSuggestion/createSuggestion';
import GuardWatch from '../scenes/resident/guardWatch/guardWatch';
import CondominiumList from '../scenes/manager/condominium/condominiumList/condominiumList';
import GuardList from '../scenes/guard/guardList/guardList';
import GuardProfile from '../scenes/guard/guardProfile/guardProfile';
import DisableResident from '../scenes/manager/resident/disableResident/disableResident';
import InternalServiceCreate from '../scenes/internalService/internalServiceCreate/internalServiceCreate';
import InternalServiceList from '../scenes/internalService/internalServiceList/internalServiceList';
import InternalServiceProfile from '../scenes/internalService/internalServiceProfile/internalServiceProfile';
import ExternalServiceList from '../scenes/resident/externalService/extarnalServiceList/externalServiceList';
import ExternalServiceProfile from '../scenes/resident/externalService/externalServiceProfile/externalServiceProfile';
import GuardWatchList from '../scenes/guardWatch/guardWatchList/guardWatchList';
import Call from '../scenes/call/call';

const MenuStack = createStackNavigator();

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
        width: 50,
        height: 50,
      }}
      source={require('../assets/images/feregIcon.png')}
    />
  );
}

const MenuResidentStackScreen = ({navigation, user}) => (
  <MenuStack.Navigator initialRouteName='CondominiumList' screenOptions={options}>
    <MenuStack.Screen name="CondominiumList" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
        headerLeft: null,
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
      {(props) => <CondominiumList {...props} user={user} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="CondominiumMenu" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <ResidentMenu {...props} user={user} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="Invitation" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <Invitation {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ExternalService" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <ExternalService {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ExternalServiceList" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <ExternalServiceList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ExternalServiceProfile" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <ExternalServiceProfile {...props} userType={props.route.params.userType} service={props.route.params.service} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ExternalServiceEdit" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <ExternalService {...props} externalService={props.route.params.externalService} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

       {/* internalService */}
    <MenuStack.Screen name="InternalService" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <InternalServiceList {...props} user={user} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="InternalServiceCreate" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <InternalServiceCreate {...props} user={user} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="InternalServiceEdit" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <InternalServiceCreate {...props} user={user} internalService={props.route.params.internalService} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="InternalServiceProfile" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <InternalServiceProfile {...props} user={user} internalService={props.route.params.internalService}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="HelpMenu" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <HelpMenuStackScreen {...props} user={user} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="Guards" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <GuardList {...props} userType={props.route.params.userType}  condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardProfile" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <GuardProfile {...props} userType={props.route.params.userType} guard={props.route.params.guard} condominium={props.route.params.condominium} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="CreateSuggestion" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <CreateSuggestion {...props} user={user} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardWatch" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <GuardWatchList {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="DisableResident" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <DisableResident {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    {/* Call */}

    <MenuStack.Screen name="Call" 
      options={{ 
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: COLORS.darkPrimary,
        headerTitle: props => <LogoTitle {...props} />,
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
      {(props) => <Call {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
  </MenuStack.Navigator>
);

export {
  MenuResidentStackScreen,
}
