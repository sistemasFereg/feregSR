import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Share
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';

class UnadmittedProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unadmitted: this.props.unadmitted.data,
    };
  }

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageFrame}>
          <Image
            style={styles.image}
            source={this.state.unadmitted.photo ? {uri: this.state.unadmitted.photo} : require('../../../assets/images/user.png')}
          />
        </View>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Nombre: </Text>
            <Text style={styles.dataInfo}>{this.state.unadmitted.name}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Comentario: </Text>
          </View>
          <Text style={styles.comment}>{this.state.unadmitted.comment}</Text>
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
    color: COLORS.darkPrimary,
    fontSize: 15
  },
  dataInfo: {
    fontSize: 16,
    color: COLORS.white
  },
  comment: {
    fontSize: 16,
    marginLeft: '10%',
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
});

export default UnadmittedProfile;
