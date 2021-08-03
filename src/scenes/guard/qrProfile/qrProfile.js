import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import firebase from '../../../config/firebase';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

class QrProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qrCode: this.props.qrCode,
      data: [],
      gotAccess: false
    };
  }

  async componentDidMount() {
    const response = await firebase
      .firestore()
      .collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('qrCode').where('codeNum', '==', this.props.qrCode)
      .get();
      response.forEach((doc) => {
        this.setState({data: doc.data()})
        this.validateCode();
      });
  }

  async validateCode() {
    let date = moment().format('DD-MM-YYYY - HH:mm');
    let day = moment().day();
    let hour = moment().format("HH:mm");

    // Internal service user
    if(this.state.data.userType == 'internalService') {
      if(this.state.data.mondayInit) {
        if(day === 1) {
          if((hour >= this.state.data.mondayInit) && (hour <= this.state.data.mondayLimit) && (hour <= this.state.data.mondayEnd)) {
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
      }
      if(this.state.data.tuesdayInit) {
        if(day === 2) {
          if((hour >= this.state.data.tuesdayInit) && (hour <= this.state.data.tuesdayLimit) && (hour <= this.state.data.tuesdayEnd)) {
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
      }
      if(this.state.data.wednesdayInit) {
        if(day === 3) {
          if((hour >= this.state.data.wednesdayInit) && (hour <= this.state.data.wednesdayLimit) && (hour <= this.state.data.wednesdayEnd)) {
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
      }
      if(this.state.data.thursdayInit) {
        if(day === 4) {
          if((hour >= this.state.data.thursdayInit) && (hour <= this.state.data.thursdayLimit) && (hour <= this.state.data.thursdayEnd)) {
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
      }
      if(this.state.data.fridayInit) {
        if(day === 5) {
          if((hour >= this.state.data.fridayInit) && (hour <= this.state.data.fridayLimit) && (hour <= this.state.data.fridayEnd)) {
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
      }
      if(this.state.data.saturdayInit) {
        if(day === 6) {
          if((hour >= this.state.data.saturdayInit) && (hour <= this.state.data.saturdayLimit) && (hour <= this.state.data.saturdayEnd)) {
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
      }
      if(this.state.data.sundayInit) {
        if(day === 7) {
          if((hour >= this.state.data.sundayInit) && (hour <= this.state.data.sundayLimit) && (hour <= this.state.data.sundayEnd)) {
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
      }
    }
    // Resident user
    if(this.state.data.userType == 'resident') {
      const response = await firebase
        .firestore()
        .collection('user').where('residentNum', '==', this.props.qrCode)
        .get();
      response.forEach((doc) => {
        if(!doc.data().disableResident) {
          this.setState({ gotAccess: true });
        }
        else {
          this.setState({ gotAccess: false });
        }
      });
    }
    // Invitation user
    if(this.state.data.userType == 'invitation') {
      if(this.state.data.isUnique && this.state.data.isValid){
        var storageRef = await firebase.storage().ref(`QRCodes/${this.state.data.invitationId}`).delete();
        this.setState({ gotAccess: true });
      }
      else{
        this.setState({ gotAccess: false });
      }
      if(!this.state.data.isUnique){
        if((date >= this.state.data.initDate) && (date <= this.state.data.endDate)) {
          this.setState({ gotAccess: true });
        }
        else {
          this.setState({ gotAccess: false });
        }
      }
    
    }
    // Provider user
    if(this.state.data.userType == 'provider') {
      this.setState({ gotAccess: true });
      // if((date >= this.state.data.initDate) && (date <= this.state.data.limitDay) && (date <= this.state.data.endDate)) {
      //   this.setState({ gotAccess: true });
      // }
      // else {
      //   this.setState({ gotAccess: false });
      // }
    }
    // Service user
    if(this.state.data.userType == 'service') {
      if((date > this.state.data.initDate)) {
        if(date < this.state.data.limitDate){
          if(date < this.state.data.endDate){
            this.setState({ gotAccess: true });
          }
          else {
            this.setState({ gotAccess: false });
          }
        }
        else {
          this.setState({ gotAccess: false });
        }
      }
      else {
        this.setState({ gotAccess: false });
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Casa: </Text>
            <Text style={styles.dataInfo}>{this.state.data.houseNum}</Text>
          </View>
          <View style={styles.divider}/>
          {
            this.state.gotAccess
            ? <View style={styles.card}>
                <Ionicons name="md-checkmark-circle" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                <Text style={styles.name}>El usuario tiene acceso</Text>
              </View>
            : <View style={styles.card}>
                <Ionicons name="md-close-circle" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                <Text style={styles.name}>El usuario no tiene acceso</Text>
              </View>
          }
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  imageFrame: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  userName: {
    marginTop: 5,
    color: COLORS.darkPrimary,
    textAlign: 'center',
    fontSize: 20
  },
  userInfo: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16
  },
  dataContainer: {
    flexDirection: 'row',
    paddingLeft: '10%'
  },
  dataText: {
    color: COLORS.gray,
    fontSize: 15
  },
  dataInfo: {
    fontSize: 16,
    color: COLORS.white
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 10
  },
  card: {
    margin: 10,
    padding: 10, 
    backgroundColor: COLORS.darkGray,
  },
  icon: {
    alignSelf: 'center'
  },
  name: {
    alignSelf: 'center',
    color: COLORS.darkPrimary
  }
});

export default QrProfile;