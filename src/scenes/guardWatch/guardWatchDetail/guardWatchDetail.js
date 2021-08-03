import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
  } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { COLORS } from '../../../assets/styles/variables';
import moment from 'moment';
import firebase from '../../../config/firebase';
import CustomHeader from "../../../components/header";

var timer = null;

class GuardWatchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guard: this.props.guard,
      checkDoneList: [],
      latitude: null,
      longitude: null,
      region: null,
      error: '',
      initWatchDate: moment().startOf('day'),
      endWatchDate: moment().startOf('day'),
    };
  }

  async componentDidMount() {
    if(this.props.guard.checkDoneList) {
      this.setState({ checkDoneList: this.props.guard.checkDoneList});
    }
    if(this.props.guard.isFinish == false) {
      // this.locationGuard();
      this.setTimer();
    }
  }

  setTimer() {
    timer = setTimeout(() => {
      this.locationGuard();
    }, 20000);
  }

  async componentWillUnmount() {
    await clearTimeout(timer);
  }

  async locationGuard() {
    var watch = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("guardWatch").doc(`${this.props.guard.guardNum}`).get();
      if(watch.data()) {
        this.setState({ guard: watch.data()});
        this.componentDidMount();
      }
      else {
        clearTimeout(timer);
        this.props.navigation.goBack()
      }
  }

  render() {
    return (
     <SafeAreaView style={styles.container}>
        <ScrollView>
          <CustomHeader title={'Rondín'}></CustomHeader>
          <View style={styles.playerInfo}>
              <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Guardia: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.name} {this.state.guard.lastName}</Text>
            </View>
            <View style={styles.divider}/>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Fecha de inicio: </Text>
              <Text style={styles.dataInfo}>{this.state.guard.dateInit}</Text>
            </View>
            <View style={styles.divider}/>
            <View style={styles.dataContainer}>
              <Text style={styles.dataText}>Fecha de fin: </Text>
              {
                this.props.guard.dateEnd
                ? <Text style={styles.dataInfo}>{this.state.guard.dateEnd}</Text>
                : <Text style={styles.dataInfo}>En progreso</Text>
              }
            </View>
            <View style={styles.divider}/>
            {
              this.state.checkDoneList 
                ? <View>
                    <CustomHeader title={'Tareas'}></CustomHeader>
                    {
                      this.state.checkDoneList.map((check, i) => (
                        <View key={i}>
                          <View style={styles.dataContainer}>
                            <Text style={styles.dataText}>Nombre: </Text>
                            <Text style={styles.dataInfo}>{check.name}</Text>
                          </View>
                          <View style={styles.divider}/>
                        </View>
                      ))
                    }
                  </View>
                : null
            }
          </View>
          
          {
            this.state.guard.latitude || this.state.guard.longitude
            ? <MapView 
                initialRegion={{
                  latitude: this.state.guard.latitude,
                  longitude: this.state.guard.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                showsUserLocation={true}
                rotateEnabled={true}
                strokeColor= '#000'
                ref={map => {
                  this.map = map;
                }}
                style={styles.map}
              >  
                <Marker
                  coordinate={{
                    latitude: this.state.guard.latitude,
                    longitude: this.state.guard.longitude,
                  }}
                />
              </MapView>
            : null
          }
       </ScrollView>
     </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray,
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
    color: COLORS.primary,
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
  map: {
    width: "90%",
    borderRadius: 25,
    height: 250,
    justifyContent: "center",
    alignSelf: 'center',
    padding: 20,
    marginTop: 10
  },
  check: {
    width: "50%",
    height: 50,
  }
});

export default GuardWatchDetail;
