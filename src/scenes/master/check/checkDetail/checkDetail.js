import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../../../assets/styles/variables';
import CustomHeader from '../../../../components/header';

class CheckDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      check: this.props.check,
      error: false
    };
    console.log(this.props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={`${this.state.check.name}`}/>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Descripción: </Text>
            <Text style={styles.dataInfo}>{this.state.description}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Fecha: </Text>
            <Text style={styles.dataInfo}>{this.state.initDate}</Text>
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

export default CheckDetail;