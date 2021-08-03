import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import CustomHeader from '../../../components/header';

class SuggestionProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      error: false
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={`${this.state.message.type} ${this.state.message.guardName}`}/>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Mensaje: </Text>
          </View>
          <View style={styles.divider}/>
          <Text style={styles.dataInfo}>{this.state.message.comment}</Text>
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
    height: '100%'
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
    paddingLeft: '10%',
    justifyContent: 'center'
   
  },
  dataText: {
    color: COLORS.gray,
    fontSize: 16,
    textAlign: 'center'
  },
  dataInfo: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
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

export default SuggestionProfile;