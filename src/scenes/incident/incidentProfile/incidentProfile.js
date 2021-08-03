import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';


class IncidentProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incident: this.props.incident,
    };
  }
  

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.divider}/>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Título: </Text>
            <Text style={styles.dataInfo}>{this.state.incident.title}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Fecha: </Text>
            <Text style={styles.dataInfo}>{this.state.incident.date}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Comentario: </Text>
            <Text style={styles.dataInfo}>{this.state.incident.comment}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <View style={styles.imageFrame}>
          <Image
              options={{ format: "jpg", quality: 0.9 }}
              style={styles.image}
              source={{uri: this.props.incident.image}}
            />
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
    height: 180,
    width: 280,
    marginRight: 10,
    backgroundColor: COLORS.white
  },
});

export default IncidentProfile;
