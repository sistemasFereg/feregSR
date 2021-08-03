import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Vibration,
  Image
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from '../../../../config/firebase';
import CustomHeader from '../../../../components/header';
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions"
import { Audio } from 'expo-av';
import GlobalStyle from '../../../../assets/styles/custom';

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [2 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];
// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    // Vibration.vibrate(PATTERN, true)
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      autoDismiss: false,
    }
  },
})

class CondominiumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condominiumList: [],
      user: '',
      noData: false,
      errorDelete: false,
      error: false,
      responseListener: React.createRef()
    };
  }

  async componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener('focus', () => {this.componentDidMount();});
    // Vibration.cancel();
    // Permission for iOS
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj => {
        // Check if we already have permission
        if (statusObj.status !== "granted") {
          // If permission is not there, ask for the same
          return Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        return statusObj
      })
      .then(statusObj => {
        // If permission is still not given throw error
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted")
        }
      })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    this.state.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      this.props.navigation.navigate('Call', {link: response.notification.request.content.data.link, channel: response.notification.request.content.data.channel})
    });

    this.setState({ showLoader: true });
    this.setState({ user: this.props.user })
    const condominiumArray = [];
    if(this.props.user.userType === 'admin') {
      var snapshot = await firebase.firestore().collection("condominium").where('managerNum', '==', this.props.user.managerNum).get();
      snapshot.forEach((doc) => {
        condominiumArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        }
      });
      this.setState({ condominiumList: condominiumArray });
      if(condominiumArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
    }
    else if(this.props.user.userType === 'resident') {
      var snapshot = await firebase.firestore().collection("condominium").where('name', '==', this.props.user.condominium).get();
      snapshot.forEach((doc) => {
        condominiumArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        }
      });
      this.setState({ condominiumList: condominiumArray });
      if(condominiumArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
    }
    else if(this.props.user.userType === 'guard') {
      var snapshot = await firebase.firestore().collection("condominium").where('name', '==', this.props.user.condominium).get();
      snapshot.forEach((doc) => {
        condominiumArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        }
      });
      this.setState({ condominiumList: condominiumArray });
      if(condominiumArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
    }
    else if(this.props.user.userType === 'supervisor') {
      var snapshot = await firebase.firestore().collection("condominium").where('supNum', '==', this.props.user.superNum).get();
      snapshot.forEach((doc) => {
        condominiumArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        }
      });
      this.setState({ condominiumList: condominiumArray });
      if(condominiumArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
    }
    else {
      var snapshot = await firebase.firestore().collection("condominium").get();
      snapshot.forEach((doc) => {
        condominiumArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        };
      });
      this.setState({ condominiumList: condominiumArray });
      if(condominiumArray.length === 0) {
        this.setState({ noData: true });
        this.setState({ showLoader: false });
      }
      else {
        this.setState({ noData: false });
      }
    }
  }

  deleteCondominium(name) {
    firebase.firestore().collection('condominium').doc(name).delete()
      .then((res) => {
        this.componentDidMount();
      })
      .catch((err) => {
        this.setState({ errorDelete: true });
        console.error("Error: ", err);
      });
  }

  render() {
    return (
      <SafeAreaView >
        <CustomHeader title={'Condominios'}/>
        <ScrollView style={styles.container}>
          {
            this.props.user.userType === 'master'
            ? <View style={styles.addContainer}>
                <Text style={styles.addText}>Agregar Administrador: </Text>
                <TouchableOpacity
                  style={styles.addButton} 
                  onPress={() => this.props.navigation.navigate('CreateManager')}
                >
                  <Ionicons name="md-add-circle" color={COLORS.darkPrimary} size={30} style={styles.icon}/>
                </TouchableOpacity>
              </View>
            : null
          }
          {
            this.props.user.userType === 'master'
            ? <View style={styles.addContainer}>
                <Text style={styles.addText}>Agregar Supervisor: </Text>
                <TouchableOpacity
                  style={styles.addButton} 
                  onPress={() => this.props.navigation.navigate('CreateSupervisor')}
                >
                  <Ionicons name="md-add-circle" color={COLORS.darkPrimary} size={30} style={styles.icon}/>
                </TouchableOpacity>
              </View>
            : null
          }
          {
            this.props.user.userType === 'admin'  || this.props.user.userType === 'master'
            ? <View style={styles.addContainer}>
                <Text style={styles.addText}>Agregar Condominio: </Text>
                <TouchableOpacity
                  style={styles.addButton} 
                  onPress={() => this.props.navigation.navigate('CondominiumCreate')}
                >
                  <Ionicons name="md-add-circle" color={COLORS.darkPrimary} size={30} style={styles.icon}/>
                </TouchableOpacity>
              </View>
            : null
          }
          {
            this.state.showLoader
            ? <View style={styles.loaderContainer}>
                <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
              </View>
            : null
          }
          {
            this.state.noData
            ? <Text style={styles.noData}>Aún no hay información</Text>
            : null
          }
          {
            this.state.errorDelete
            ? <Text style={styles.noData}>Error al eliminar la información</Text>
            : null
          }
          {
            this.state.condominiumList.map((condominium, i) => (
              <Card style={styles.card} key={i}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CondominiumMenu', { condominium: condominium })}>
                  <View style={styles.cardContent}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={require('../../../../assets/images/icons/condominium.png')}
                    />
                    {/* <Ionicons name="map-outline" color={COLORS.darkPrimary} size={50} style={styles.icon}/> */}
                    <View style={styles.cardText}>
                      <View style={styles.info}>
                        <Text style={styles.nameTitle}>Condominio: </Text>
                        <Text style={styles.name}>{condominium.name}</Text>
                      </View>
                      {
                        this.props.user.userType  === 'admin' || this.props.user.userType === 'master'
                        ? <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                              style={styles.buttonIcon} 
                              onPress={() => this.props.navigation.navigate('CondominiumEdit', { condominium: condominium })}
                            >
                              <Ionicons name="md-create" color={COLORS.darkPrimary} size={20} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.buttonIcon} 
                              onPress={() => this.deleteCondominium(condominium.name)}
                            >
                              <Ionicons name="md-trash" color={COLORS.accent} size={20} style={styles.icon}/>
                            </TouchableOpacity>
                          </View>
                        : null
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            ))
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray,
    paddingTop: 10
  },
  card: {
    width: '95%',
    margin: 10,
    backgroundColor: COLORS.darkGray
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10, 
    backgroundColor: COLORS.darkGray
  },
  icon: {
    color: COLORS.darkPrimary,
    marginTop: 5
  },
  cardText: {
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 5
  },
  nameTitle: {
    color: COLORS.darkPrimary,
    marginLeft: 16
  },
  name: {
    marginLeft: 8,
    color: COLORS.white
  },
  description: {
    marginLeft: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: '70%'
  },
  buttonIcon: {
    marginLeft: 10
  },
  addContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginEnd: 20
  },
  addText: {
    color: COLORS.darkPrimary,
    marginTop: 12
  }, 
  noData: {
   textAlign: 'center',
   color: COLORS.darkPrimary,
    marginTop: 12
  }
});

export default CondominiumList;
