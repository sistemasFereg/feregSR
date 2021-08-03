import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '../assets/styles/variables';
import { HelpMenuStackScreen } from './helpMenu';
import CreateSuggestion from '../scenes/suggestion/createSuggestion/createSuggestion';
import ProviderList from '../scenes/provider/providerList/providerList';
import CreateProvider from '../scenes/provider/createProvider/createProvider';
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
import GuardMenu from '../scenes/guard/guardMenu/guardMenu';
import Call from '../scenes/call/call';
import QrCode from '../scenes/guard/qrCode/qrCode';
import QrProfile from '../scenes/guard/qrProfile/qrProfile';
import CreateVisitor from '../scenes/visitor/createVisitor/createVisitor';
import CondominiumList from '../scenes/manager/condominium/condominiumList/condominiumList';
import VisitorList from '../scenes/visitor/visitorList/visitorList';
import VisitorProfile from '../scenes/visitor/visitorProfile/visitorProfile';

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

const MenuGuardStackScreen = ({navigation, user}) => (
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
      {(props) => <CondominiumList {...props} user= {user} />}
    </MenuStack.Screen>
    <MenuStack.Screen name="CondominiumMenu" 
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
      {(props) => <GuardMenu {...props} user={user} condominium={props.route.params.condominium}/>}
    </MenuStack.Screen>

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
      {(props) => <VisitorList {...props} userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
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
      {(props) => <VisitorProfile {...props} visitor={props.route.params.visitor} condominium={props.route.params.condominium} />}
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
      {(props) => <ProviderList {...props}  userType={props.route.params.userType} condominium={props.route.params.condominium}/>}
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
      {(props) => <InternalService {...props} condominium={props.route.params.condominium}/>}
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
      {(props) => <InternalServiceList {...props} user={user} condominium={props.route.params.condominium}/>}
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
      {(props) => <InternalServiceCreate {...props} internalService={props.route.params.internalService} condominium={props.route.params.condominium}/>}
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
      {(props) => <GuardWatchCreate {...props} user={user} condominium={props.route.params.condominium}/>}
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
      {(props) => <GuardWatchCreate {...props} user={user} guardWatch={props.route.params.guardWatch} condominium={props.route.params.condominium}/>}
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
      {(props) => <GuardList {...props} condominium={props.route.params.condominium}/>}
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
      {(props) => <UnadmittedList {...props} condominium={props.route.params.condominium}/>}
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
      {(props) => <Call {...props} userType={props.route.params.userType} condominium={props.route.params.condominium} />}
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
    
  </MenuStack.Navigator>
);

export {
  MenuGuardStackScreen,
}
