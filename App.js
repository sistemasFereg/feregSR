import React from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  ActivityIndicator 
} from 'react-native';
import * as Font from 'expo-font';
//External
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from './src/config/firebase';
import GlobalFont from 'react-native-global-font';
// Routes
import AuthStackNav from './src/routes/auth';
// Scenes
import TopNavbar from './src/scenes/topNavbar/topNavbar';
// Contexts
import AuthContext from './src/context/auth-context';
import Loader from './src/components/loader';
import AuthService from './src/services/auth';
import * as Notifications from "expo-notifications"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: false,
      email: '',
      user: null,
      userInfo: null,
      userType: '',
      isLogged: false,
      setLogged: this.setLogged.bind(this),
      loading: true
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      galanogrotesque: require('./src/assets/fonts/galanogrotesque.ttf'),
      customIcons: require('./src/assets/fonts/custom-icons.ttf')
    });
    //agrege esto como prueba // Show notifications when the app is in the foreground

    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
        }
      },
    })

    const fontName = 'galanogrotesque';
    GlobalFont.applyGlobal(fontName);

    this.setState({ assetsLoaded: true });
    // Uncomment this line only to delete the token for testing purposes
    // this.deleteUserToken();

    this.setState({ assetsLoaded: true });
    await firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
      if(!user){
        this.setState({ loading: false });
      }
    });
  }

  /**
   * Only for testing purposes, so the token can be deleted manually
   */
   deleteUserToken = () => {
    AuthService.deleteToken()
      .then((token) => {
        console.log('Set token :>> ', token);
      });
  }

  async setLogged(isLogged) {
    this.setState({ isLogged });
  }

  render() {
    const { assetsLoaded } = this.state;
    const Stack = createStackNavigator();
    if(this.state.user) {
      return (
        <AuthContext.Provider value={this.state}>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Navbar" options={{ headerShown: false }}>
                {props => (<TopNavbar {...props} user={this.state.user}/>)}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      );
    }
    else if (assetsLoaded) {
      return (
        <AuthContext.Provider value={this.state}>
          <StatusBar barStyle="light-content" />
          {
            this.state.loading
              ? <Loader isLoading={this.state.loading} />
              : (
                <NavigationContainer>
                  <Stack.Navigator>
                    {
                      !this.state.isLogged
                        ? (
                          <Stack.Screen name="Login" options={{ headerShown: false }}>
                            {(props) => <AuthStackNav {...props} />}
                          </Stack.Screen>
                        ) : <Stack.Screen name="Navbar" options={{ headerShown: false }}>
                              {(props) => <TopNavbar {...props} user={this.state.user} />}
                            </Stack.Screen>
                    }
                  </Stack.Navigator>
                </NavigationContainer>
              )
          }
        </AuthContext.Provider>
      )
    }
    return (
      <SafeAreaView>
        <ActivityIndicator />
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
    );
  }
}

export default App;
