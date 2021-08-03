import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

class DisableResident extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disableResident: false

    };
  }

  render() { 
    return (
      <SafeAreaView style={styles.container}>
          <View>
            <Ionicons name="md-close-circle" color={COLORS.darkPrimary} size={200} style={styles.icon}/>
            <Text style={styles.name}>Bloqueado por adeudo</Text>
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  btnContainer: {
    marginTop: '30%',
    width: '100%',
    flexDirection: 'row'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  button: {
    width: '50%'
  },
  text: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
    fontSize: 15
  },
  icon: {
    alignSelf: 'center'
  },
  name: {
    alignSelf: 'center',
    color: COLORS.darkPrimary
  }

});

export default DisableResident;