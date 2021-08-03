import React from 'react';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Logout from '../auth/logout/logout';
import { COLORS } from '../../assets/styles/variables';
import { ProfileStackScreen } from '../../routes/profile';
import { MenuResidentStackScreen } from '../../routes/menuResident';
import { MenuManagerStackScreen } from '../../routes/menuManager';
import AuthContext from '../../context/auth-context';
import firebase from '../../config/firebase';
import { MenuSupervisorStackScreen } from '../../routes/menuSupervisor';
import { MenuGuardStackScreen } from '../../routes/menuGuard';
import Loader from '../../components/loader/index';
import { MenuMasterStackScreen } from '../../routes/menuMaster';
import { DisabletackScreen } from '../../routes/disableResident';
import * as Notifications from 'expo-notifications';
import { RhStackScreen } from '../../routes/menuRH';
import AuthService from '../../services/auth';
import { MenuCenterStackScreen } from '../../routes/menuCenter';

class TopNavbar extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props); 
    this.state = {
      userType: '',
      user: '',
      token: '',
      disableResident: false
    };
  }

  async componentDidMount() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    // if (Platform.OS === 'android') {
    //   Notifications.setNotificationChannelAsync('default', {
    //     name: 'default',
    //     importance: Notifications.AndroidImportance.MAX,
    //     vibrationPattern: [0, 250, 250, 250],
    //     lightColor: '#FF231F7C',
    //   });
    // }

    const token = await AuthService.getExpoToken();
    this.setState({ token: token })

    const user = await firebase.auth().currentUser;
    if(user) {
      const users = await firebase
        .firestore()
        .collection('user')
        .doc(user.email)
        .get();

      if (!users.exists){
        console.log('No user data found')
      } else {
        this.setState({ loading: false });
        let dataObj = users.data();
        this.setState({ user: dataObj });
        this.setState({ userType: dataObj.userType });
        this.setState({ disableResident: dataObj.disableResident });
        firebase.firestore().collection("user").doc(`${dataObj.email}`).update({
          expoToken: this.state.token,
        }).then((res) => {
        })
        .catch((err) => {
          console.error("Error found: ", err);
        });
      }
    }
    else {
      this.setState({ loading: true });
    }
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      firebase.firestore().collection("user").doc(`${dataObj.email}`).update({
        expoToken: token,
      }).then((res) => {
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  render() {    
    const Drawer = createDrawerNavigator();
    if(this.state.userType === 'guard') {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.lightGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.black
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<MenuGuardStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
    } else if(this.state.userType === 'resident' && this.state.disableResident == false) {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.lightGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.black
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<MenuResidentStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
    } else if(this.state.userType === 'resident' && this.state.disableResident == true) {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.lightGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.black
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<DisabletackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
      } else if(this.state.userType === 'admin') {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.lightGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.black
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<MenuManagerStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
    } 
    else if(this.state.userType === 'supervisor') {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.lightGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.black
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<MenuSupervisorStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
    } 
    else if(this.state.userType === 'master') {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.darkGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.white
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<MenuMasterStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
    }
    else if(this.state.userType === 'rh') {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.darkGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.white
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<RhStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
    }
    else if(this.state.userType === 'center') {
      return (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {... props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: COLORS.lightGray
          }}
          drawerContentOptions={{
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: COLORS.black
          }}
        >
          <Drawer.Screen name="Inicio">
            {props => (<MenuCenterStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen>
          {/* <Drawer.Screen name="Perfil">
            {props => (<ProfileStackScreen {...props} user={this.state.user}/>)}
          </Drawer.Screen> */}
          <Drawer.Screen name="Cerrar sesión" component={Logout} />
        </Drawer.Navigator>
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Loader isLoading={this.state.loading} />
        </SafeAreaView>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width: '100%',
    backgroundColor: COLORS.darkGray,
  },
});

export default TopNavbar;
