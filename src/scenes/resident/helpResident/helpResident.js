import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  Image
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-shadow-cards';
import firebase from '../../../config/firebase';

class HelpResident extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guardData: '',
      supervisorData: '',
      centerData: '',
      security: '',
      med: '',
      protection: ''
    };
  }

  async componentDidMount() {
    if(this.props.user.userType === 'resident') {
      this.setState({ 
        security: `La casa #${this.props.user.residentNum} tiene una emergencia de seguridad`,
        med: `La casa #${this.props.user.residentNum} tiene una emergencia médica`,
        protection: `La casa #${this.props.user.residentNum} tiene una emergencia de protección civil`
      })
      this.getGuard();
      this.getSupervisor();
      this.getCenter();
    }
    if(this.props.user.userType === 'admin') {
      this.setState({ 
        security: `El administrador tiene una emergencia de seguridad`,
        med: `El administrador tiene una emergencia médica`,
        protection: `El administrador tiene una emergencia de protección civil`
      })
      this.getGuard();
      this.getSupervisor();
      this.getCenter();
    }
    if(this.props.user.userType === 'guard') {
      this.setState({ 
        security: `El guardia tiene una emergencia de seguridad`,
        med: `El guardia tiene una emergencia médica`,
        protection: `El guardia tiene una emergencia de protección civil`
      })
      this.getSupervisor();
      this.getCenter();
    }
    if(this.props.user.userType === 'supervisor') {
      this.setState({ 
        security: `El supervisor tiene una emergencia de seguridad`,
        med: `El supervisor tiene una emergencia médica`,
        protection: `El supervisor tiene una emergencia de protección civil`
      })
      this.getCenter();
    }
  }

  async getGuard() {
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.condominium.name}`).collection('guard').where('place', '==', 'Caseta').get();    
    snapshot.forEach((doc) => {
      this.getGuardUser(doc.data());
    });
  }

  async getCenter() {
    var snapshot = await firebase.firestore().collection("user").where('email', '==', 'cmonitoreo@feregsp.com').get();    
    snapshot.forEach((doc) => {
      this.setState({ centerData: doc.data()})
    });
  }

  async getSupervisor() {
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.condominium.name}`).collection('supervisor').get();    
    snapshot.forEach((doc) => {
      this.getSupervisorUser(doc.data())
    });
  }

  async getSupervisorUser(supervisor) {
    console.log(supervisor)
    var snapshot = await firebase.firestore().collection("user").where('superNum', '==', supervisor.superNum).get();    
    snapshot.forEach((doc) => {
      this.setState({ supervisorData: doc.data()})
    });
  }

  async getGuardUser(guard) {
    console.log(guard)
    var snapshot = await firebase.firestore().collection("user").where('guardNum', '==', guard.guardNum).get();    
    snapshot.forEach((doc) => {
      this.setState({ guardData: doc.data()})
    });
  }

  async sendNotification(text) {
    let tokens = [
      this.state.guardData.expoToken,
      this.state.supervisorData.expoToken,
      this.state.centerData.expoToken
    ]
    console.log(tokens)
    tokens.map(token => {
      const message = {
        to: token,
        sound: 'default',
        title: 'Fereg SR',
        body: text,
        priority: 'high',
        data: { 
        },
      };
      this.send(message)
    })
  }

  async send(message) {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(message),
    })
    .then(res => {
    })
    .catch(error => {
      alert(error)
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {
          this.props.user.userType === 'center'
          ? <View>
              <View style={styles.cardContainer}>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} 
                    onPress={() => {
                      Linking.openURL(`tel:1234`)
                    }}>
                    <View>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/images/icons/police.png')}
                      />
                      <Text style={styles.name}>Emergencia Seguridad</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} 
                    onPress={() => {
                      Linking.openURL(`tel:1234`)
                    }}>
                    <View>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/images/icons/med.png')}
                      />
                      <Text style={styles.name}>Emergencia Médica</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
              <View style={styles.cardContainer}>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} 
                    onPress={() => {
                      Linking.openURL(`tel:1234`)
                    }}>
                    <View>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/images/icons/protect.png')}
                      />
                      <Text style={styles.name}>Protección Civil</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            </View>
          : <View>
              <View style={styles.cardContainer}>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} 
                    onPress={() => {
                      Alert.alert('Fereg SR','Tu notificación ha sido enviada'),
                      this.sendNotification(this.state.security);
                    }}>
                    <View>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/images/icons/police.png')}
                      />
                      <Text style={styles.name}>Emergencia Seguridad</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} 
                    onPress={() => {
                      Alert.alert('Fereg SR','Tu notificación ha sido enviada'),
                      this.sendNotification(this.state.med);
                    }}>
                    <View>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/images/icons/med.png')}
                      />
                      <Text style={styles.name}>Emergencia Médica</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
              <View style={styles.cardContainer}>
                <Card style={styles.card}>
                  <TouchableOpacity style={styles.button} 
                    onPress={() => {
                      Alert.alert('Fereg SR','Tu notificación ha sido enviada'),
                      this.sendNotification(this.state.protection);
                    }}>
                    <View>
                      <Image
                        style={styles.icon}
                        source={require('../../../assets/images/icons/protect.png')}
                      />
                      <Text style={styles.name}>Protección Civil</Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            </View>
        }
        
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  cardContainer: {
    flexDirection: 'row'
  },
  button: {
    width: '100%',
  },
  card: {
    width: '45%',
    padding: 10, 
    margin: 10,
    backgroundColor: COLORS.darkGray
  },
  icon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    color: COLORS.darkPrimary,
    textAlign: 'center'
  }
});


export default HelpResident;