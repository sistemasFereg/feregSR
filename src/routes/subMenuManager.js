import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import ResidentMenu from '../scenes/resident/residentMenu/residentMenu';
import Invitation from '../scenes/resident/invitation/invitation';
import ExternalService from '../scenes/resident/externalService/externalService';
import { HelpMenuStackScreen } from './helpMenu';
import Profile from '../scenes/profile/profile';
import Guards from '../scenes/shared/guards/guards';
import CreateSuggestion from '../scenes/suggestion/createSuggestion/createSuggestion';
import GuardWatch from '../scenes/resident/guardWatch/guardWatch';
import ManagerMenu from '../scenes/manager/managerMenu/managerMenu';
import CreateResident from '../scenes/manager/resident/createResident/createResident';
import ResidentList from '../scenes/manager/resident/residentList/residentList';
import ProviderList from '../scenes/provider/providerList/providerList';
import CreateProvider from '../scenes/provider/createProvider/createProvider';
import ResidentProfile from '../scenes/manager/resident/residentProfile/residentProfile';
import ProviderProfile from '../scenes/provider/providerProfile/providerProfile';
import InternalServiceCreate from '../scenes/internalService/internalServiceCreate/internalServiceCreate';
import InternalServiceList from '../scenes/internalService/internalServiceList/internalServiceList';
import InternalServiceProfile from '../scenes/internalService/internalServiceProfile/internalServiceProfile';
import GuardWatchCreate from '../scenes/guardWatch/guardWatchCreate/guardWatchCreate';
import GuardWatchList from '../scenes/guardWatch/guardWatchList/guardWatchList'
import GuardList from '../scenes/guard/guardList/guardList';
import GuardProfile from '../scenes/guard/guardProfile/guardProfile';
import CreateGuard from '../scenes/guard/guardCreate/guardCreate';
import IncidentList from '../scenes/incident/incidentList/incidentList';
import IncidentCreate from '../scenes/incident/incidentCreate/incidentCreate';
import IncidentProfile from '../scenes/incident/incidentProfile/incidentProfile';
import UnadmittedList from '../scenes/unadmitted/unadmittedList/unadmittedList';
import UnadmittedCreate from '../scenes/unadmitted/unadmittedCreate/unadmittedCreate';
import UnadmittedProfile from '../scenes/unadmitted/unadmittedProfile/unadmittedProfile';
import CondominiumMenu from '../scenes/manager/condominium/condominiumMenu/condominiumMenu';

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
      style={{ 
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
      }}
      source={require('../assets/images/feregIcon.png')}
    />
  );
}

const SubMenuManagerStackScreen = ({navigation}) => (
  <MenuStack.Navigator initialRouteName='ManagerMenu' screenOptions={options}>
    <MenuStack.Screen name="ManagerMenu" 
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
      {(props) => <CondominiumMenu {...props} />}
    </MenuStack.Screen>

    {/* Resident Stack */}

    <MenuStack.Screen name="AddResident" 
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
      {(props) => <CreateResident {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditResident" 
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
      {(props) => <CreateResident {...props} resident={props.route.params.resident} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="ResidentList" 
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
      {(props) => <ResidentList {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="ResidentProfile" 
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
      {(props) => <ResidentProfile {...props} resident={props.route.params.resident} />}
    </MenuStack.Screen>

    {/* Provider Stack */}

    <MenuStack.Screen name="ProviderList" 
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
      {(props) => <ProviderList {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="AddProvider" 
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
      {(props) => <CreateProvider {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditProvider" 
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
      {(props) => <CreateProvider {...props} provider={props.route.params.provider} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="ProviderProfile" 
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
      {(props) => <ProviderProfile {...props} provider={props.route.params.provider} />}
    </MenuStack.Screen>
    
    {/*Internal Service Stack*/}

    <MenuStack.Screen name="InternalService" 
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
      {(props) => <InternalService {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="InternalServiceCreate" 
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
      {(props) => <InternalServiceCreate {...props}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="InternalServiceList" 
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
      {(props) => <InternalServiceList {...props}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="InternalServiceProfile" 
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
      {(props) => <InternalServiceProfile {...props} internalService={props.route.params.internalService}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="InternalServiceEdit" 
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
      {(props) => <InternalServiceCreate {...props} internalService={props.route.params.internalService}/>}
    </MenuStack.Screen>

    {/* Guard Watch */}
    
    <MenuStack.Screen name="GuardWatch" 
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
      {(props) => <GuardWatchList {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardWatchCreate" 
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
      {(props) => <GuardWatchCreate {...props}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardWatchEdit" 
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
      {(props) => <GuardWatchCreate {...props} guard={props.route.params.guard}/>}
    </MenuStack.Screen>

    {/* Guards */}

    <MenuStack.Screen name="Guards" 
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
      {(props) => <GuardList {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardProfile" 
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
      {(props) => <GuardProfile {...props} guard={props.route.params.guard}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardCreate" 
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
      {(props) => <CreateGuard {...props}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="GuardEdit" 
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
      {(props) => <CreateGuard {...props} guard={props.route.params.guard}/>}
    </MenuStack.Screen>

    {/* Incidents */}

    <MenuStack.Screen name="IncidentList" 
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
      {(props) => <IncidentList {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="IncidentCreate" 
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
      {(props) => <IncidentCreate {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditIncident" 
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
      {(props) => <IncidentCreate {...props} incident={props.route.params.incident}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="IncidentProfile" 
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
      {(props) => <IncidentProfile {...props} incident={props.route.params.incident}/>}
    </MenuStack.Screen>

    {/* Unadmitted */}

    <MenuStack.Screen name="UnadmittedList" 
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
      {(props) => <UnadmittedList {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="UnadmittedCreate" 
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
      {(props) => <UnadmittedCreate {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditUnadmitted" 
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
      {(props) => <UnadmittedCreate {...props} unadmitted={props.route.params.unadmitted}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="UnadmittedProfile" 
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
      {(props) => <UnadmittedProfile {...props} unadmitted={props.route.params.unadmitted}/>}
    </MenuStack.Screen>






    <MenuStack.Screen name="HelpMenu" 
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
      {(props) => <HelpMenuStackScreen {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="CreateSuggestion" 
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
      {(props) => <CreateSuggestion {...props} />}
    </MenuStack.Screen>
    
  </MenuStack.Navigator>
);

export {
  SubMenuManagerStackScreen,
}
