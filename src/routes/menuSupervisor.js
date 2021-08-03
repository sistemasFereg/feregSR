import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import { HelpMenuStackScreen } from './helpMenu';
import CreateSuggestion from '../scenes/suggestion/createSuggestion/createSuggestion';
import GuardWatchCreate from '../scenes/guardWatch/guardWatchCreate/guardWatchCreate';
import GuardWatchList from '../scenes/guardWatch/guardWatchList/guardWatchList'
import GuardList from '../scenes/guard/guardList/guardList';
import GuardProfile from '../scenes/guard/guardProfile/guardProfile';
import CreateGuard from '../scenes/guard/guardCreate/guardCreate';
import IncidentList from '../scenes/incident/incidentList/incidentList';
import IncidentCreate from '../scenes/incident/incidentCreate/incidentCreate';
import IncidentProfile from '../scenes/incident/incidentProfile/incidentProfile';
import SupervisorMenu from '../scenes/supervisor/supervisorMenu/supervisorMenu';
import CondominiumList from '../scenes/manager/condominium/condominiumList/condominiumList';
import AsignGuard from '../scenes/guard/guardAsign/guardAsign';
import CheckList from '../scenes/supervisor/checkList/checkList';
import GuardWatchDetail from '../scenes/guardWatch/guardWatchDetail/guardWatchDetail' ;
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

const MenuSupervisorStackScreen = ({navigation, user}) => (
  <MenuStack.Navigator initialRouteName='CondominiumList' screenOptions={options}>
    <MenuStack.Screen name="CondominiumList" 
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
      {(props) => <CondominiumList {...props} user={user}/>}
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
      {(props) => <SupervisorMenu {...props} user={user} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

    {/* Guard Watch */}
    
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
      {(props) => <GuardWatchList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardWatchCreate" 
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
      {(props) => <GuardWatchCreate {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardWatchEdit" 
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
      {(props) => <GuardWatchCreate {...props} guard={props.route.params.guard} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardWatchDetail" 
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
      {(props) => <GuardWatchDetail {...props} guard={props.route.params.guard} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

    {/* Guards */}

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
      {(props) => <GuardList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="AsignGuard" 
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
      {(props) => <AsignGuard {...props} condominium={props.route.params.condominium}/>}
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
      {(props) => <GuardProfile {...props} guard={props.route.params.guard}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardCreate" 
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
      {(props) => <CreateGuard {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardEdit" 
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
      {(props) => <CreateGuard {...props} guard={props.route.params.guard} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

    {/* Incidents */}

    <MenuStack.Screen name="IncidentList" 
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
      {(props) => <IncidentList {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="IncidentCreate" 
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
      {(props) => <IncidentCreate {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditIncident" 
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
      {(props) => <IncidentCreate {...props} incident={props.route.params.incident} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="IncidentProfile" 
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
      {(props) => <IncidentProfile {...props} incident={props.route.params.incident}/>}
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
      {(props) => <HelpMenuStackScreen {...props} user={user}/>}
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
    <MenuStack.Screen name="CheckList" 
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
      {(props) => <CheckList {...props} user={user} condominium={props.route.params.condominium}/>}
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
  MenuSupervisorStackScreen,
}
