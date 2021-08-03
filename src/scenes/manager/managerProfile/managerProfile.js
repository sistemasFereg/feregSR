import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import CustomHeader from '../../../components/header';
import firebase from '../../../config/firebase';

class ManagerProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      manager: '',
      error: false
    };
  }
  async  componentDidMount(){
  //console.log(this.props);
  var snapshot = await firebase.firestore().collection('user').where('managerNum', '==',this.props.manager.managerNum).get();
    //this.setState({guard: snapshot.data()});
    snapshot.forEach((doc) => {
      this.setState({ manager: doc.data()})
      console.log(this.props);
    });
  
}
  render() {
    return (
      <SafeAreaView style={styles.container}>
       <CustomHeader title={`${this.state.manager.name} ${this.state.manager.lastName}`}/>
        <View style={styles.imageFrame}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/user.png')}
          />
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Número de administrador: </Text>
            <Text style={styles.dataInfo}>{this.state.manager.managerNum}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Email: </Text>
            <Text style={styles.dataInfo}>{this.state.manager.email}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Telefono: </Text>
            <Text style={styles.dataInfo}>{this.state.manager.phone}</Text>
          </View>
          <View style={styles.divider}/>
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
  playerInfo: {
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
  codeContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 16
  },
});

export default ManagerProfile;