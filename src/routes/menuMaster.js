import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import CondominiumList from '../scenes/manager/condominium/condominiumList/condominiumList';
import CreateCondominium from '../scenes/manager/condominium/condominiumCreate/condominiumCreate';
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
import CreateSuggestion from '../scenes/suggestion/createSuggestion/createSuggestion';
import { HelpMenuStackScreen } from './helpMenu';
import CreateVisitor from '../scenes/visitor/createVisitor/createVisitor';
import Invitation from '../scenes/resident/invitation/invitation';
import Call from '../scenes/call/call';
import QrCode from '../scenes/guard/qrCode/qrCode';
import QrProfile from '../scenes/guard/qrProfile/qrProfile';
import MasterMenu from '../scenes/master/menuMaster/menuMaster';
import CreateSupervisor from '../scenes/supervisor/createSupervisor/createSupervisor';
import CreateManager from '../scenes/manager/createManager/createManager';
import ManagerList from '../scenes/manager/managerList/managerList';
import ManagerProfile from '../scenes/manager/managerProfile/managerProfile';
import SupervisorList from '../scenes/supervisor/supervisorList/supervisorList';
import SupervisorProfile from '../scenes/supervisor/supervisorProfile/supervisorProfile';
import SuggestionList from '../scenes/suggestion/suggestionList/suggestionList';
import SuggestionProfile from '../scenes/suggestion/suggestionProfile/suggestionProfile';
import VisitorList from '../scenes/visitor/visitorList/visitorList';
import VisitorProfile from '../scenes/visitor/visitorProfile/visitorProfile';
import GuardWatchDetail from '../scenes/guardWatch/guardWatchDetail/guardWatchDetail';
import CheckCreate from '../scenes/master/check/checkCreate/checkCreate';
import CheckList from '../scenes/master/check/checkList/checkList';
import CheckDetail from '../scenes/master/check/checkDetail/checkDetail';
import ExternalServiceList from '../scenes/resident/externalService/extarnalServiceList/externalServiceList';
import ExternalServiceProfile from '../scenes/resident/externalService/externalServiceProfile/externalServiceProfile';
import ExternalService from '../scenes/resident/externalService/externalService.js';

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

const MenuMasterStackScreen = ({navigation, user}) => (
  // Menu Manager

  <MenuStack.Navigator initialRouteName='ManagerMenu' screenOptions={options}>
    <MenuStack.Screen name="ManagerMenu" 
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
      {(props) => <MasterMenu {...props} user={user} condominium={props.route.params.condominium} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="UserCreate" 
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
      {(props) => <Signup {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="CondominiumCreate" 
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
      {(props) => <CreateCondominium {...props} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="CondominiumEdit" 
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
      {(props) => <CreateCondominium {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

    {/* Resident Stack */}

    <MenuStack.Screen name="AddResident" 
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
      {(props) => <CreateResident {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditResident" 
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
      {(props) => <CreateResident {...props} resident={props.route.params.resident} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ResidentList" 
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
      {(props) => <ResidentList {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ResidentProfile" 
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
      {(props) => <ResidentProfile {...props} resident={props.route.params.resident} />}
    </MenuStack.Screen>

    {/* Provider Stack */}

    <MenuStack.Screen name="ProviderList" 
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
      {(props) => <ProviderList {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="AddProvider" 
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
      {(props) => <CreateProvider {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditProvider" 
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
      {(props) => <CreateProvider {...props} provider={props.route.params.provider} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ProviderProfile" 
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
      {(props) => <ProviderProfile {...props} provider={props.route.params.provider} />}
    </MenuStack.Screen>
    
    {/*Internal Service Stack*/}

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
    <MenuStack.Screen name="InternalServiceList" 
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
      {(props) => <InternalServiceList {...props} user={user} userType={props.route.params.userType}  condominium={props.route.params.condominium}/>}
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
      {(props) => <InternalServiceProfile {...props} internalService={props.route.params.internalService} userType={props.route.params.userType} user={user}/>}
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
      {(props) => <InternalServiceCreate {...props} user={user} condominium={props.route.params.condominium} internalService={props.route.params.internalService}/>}
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
      {(props) => <GuardWatchCreate {...props} user={user} check={props.route.params.check} condominium={props.route.params.condominium}/>}
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
      {(props) => <GuardProfile {...props} guard={props.route.params.guard} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
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
      {(props) => <IncidentList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
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

    {/* Unadmitted */}

    <MenuStack.Screen name="UnadmittedList" 
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
      {(props) => <UnadmittedList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="UnadmittedCreate" 
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
      {(props) => <UnadmittedCreate {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditUnadmitted" 
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
      {(props) => <UnadmittedCreate {...props} unadmitted={props.route.params.unadmitted} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="UnadmittedProfile" 
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
      {(props) => <UnadmittedProfile {...props} unadmitted={props.route.params.unadmitted}/>}
    </MenuStack.Screen>

    {/* Menu Guardia */}

    {/* Visitor Stack */}

    <MenuStack.Screen name="AddVisitor" 
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
      {(props) => <CreateVisitor {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditVisitor" 
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
      {(props) => <CreateVisitor {...props} visitor={props.route.params.visitor} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="VisitorList" 
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
      {(props) => <VisitorList {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

    <MenuStack.Screen name="VisitorProfile" 
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
      {(props) => <VisitorProfile {...props} visitor={props.route.params.visitor} />}
    </MenuStack.Screen>

    {/* Menu Resident */}

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

       {/* external service */}
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

    {/* Menu supervisor */}
    <MenuStack.Screen name="SupervisorList" 
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
      {(props) => <SupervisorList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}  />}
    </MenuStack.Screen>

    <MenuStack.Screen name="supervisorProfile" 
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
      {(props) => <SupervisorProfile {...props} supervisor={props.route.params.supervisor} />}
    </MenuStack.Screen>

    <MenuStack.Screen name="CreateSupervisor" 
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
      {(props) => <CreateSupervisor {...props}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditSupervisor" 
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
      {(props) => <CreateSupervisor {...props} supervisor={props.route.params.supervisor} condominium={props.route.params.condominium}  />}
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

    {/* QR Code */}

    <MenuStack.Screen name="QRCode" 
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
      {(props) => <QrCode {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="QrProfile" 
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
      {(props) => <QrProfile {...props} qrCode={props.route.params.qrCode} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

    {/* Manager */}

    <MenuStack.Screen name="CreateManager" 
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
      {(props) => <CreateManager {...props}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="EditManager" 
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
      {(props) => <CreateManager {...props} manager={props.route.params.manager} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ManagerList" 
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
      {(props) => <ManagerList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="ManagerProfile" 
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
      {(props) => <ManagerProfile {...props} manager={props.route.params.manager} />}
    </MenuStack.Screen>

    {/* Check List */}

    <MenuStack.Screen name="CheckCreate" 
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
      {(props) => <CheckCreate {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="CheckEdit" 
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
      {(props) => <CheckCreate {...props} check={props.route.params.check} condominium={props.route.params.condominium}/>}
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
      {(props) => <CheckList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>
    <MenuStack.Screen name="CheckProfile" 
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
      {(props) => <CheckDetail {...props} check={props.route.params.check} />}
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
    <MenuStack.Screen name="SuggestionList" 
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
      {(props) => <SuggestionList {...props} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

    <MenuStack.Screen name="SuggestionProfile" 
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
      {(props) => <SuggestionProfile {...props} message={props.route.params.message} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

  </MenuStack.Navigator>
);

export {
  MenuMasterStackScreen,
}
