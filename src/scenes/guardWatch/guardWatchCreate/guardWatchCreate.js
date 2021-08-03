import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firebase from '../../../config/firebase';
import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import { COLORS } from '../../../assets/styles/variables';
import CustomHeader from '../../../components/header';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import SwitchToggle from "react-native-switch-toggle";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNCheckboxCard from "react-native-checkbox-card";
import * as ImageManipulator from 'expo-image-manipulator';

var timer = null;

class GuardWatchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      error: false,
      errorData: false,
      initDate: null,// moment().format('HH:mm - DD-MM-YYYY'),
      endDate: null,
      dateNew: '',
      hasIncident: false,
      showLoader: false,
      title: '',
      comment: '',
      dateInci: '',
      image: '',
      checkList: [],
      checkDoneList: [],
      latitude: null,
      longitude: null,
      region: null,
      location: null,
      isDone: false,
      noData: false,
    };
  }

  async componentDidMount() {  
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const checkArray = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("check").get();
    snapshot.forEach((doc) => {
      checkArray.push(doc.data());
    });
    this.setState({ checkList: checkArray });

    if(checkArray.length === 0) {
      this.setState({ noData: true });
      this.setState({ showLoader: false });
    }
    else {
      this.setState({ noData: false });
    }
   
  }
  componentWillUnmount(){
    console.log('unMount')
  }

   // Gets user current location
   async getCurrentLocation() {
     this.setState({initDate: moment().format('DD-MM-YYYY - HH:mm')});
    try {
      // Location.installWebGeolocationPolyfill();
      let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
        this.setState({ latitude: location.coords.latitude})
        this.setState({ longitude: location.coords.longitude})
        let region = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        this.setState({ region: region});
        this.updateLocation()

      console.log('latitude is ' + location.coords.latitude.toString())
      console.log('longitude is ' + location.coords.longitude.toString())
    //   await navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       this.setState({ latitude: position.coords.latitude})
    //       this.setState({ longitude: position.coords.longitude})
    //       let region = {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: 0.005,
    //         longitudeDelta: 0.005,
    //       };
    //       this.setState({ region: region});
    //       this.updateLocation()
    //     },
    //     (error) => console.log(error),
    //     {enableHighAccuracy: false, timeout: 50000}
    // );
    } catch (error) {
      console.error(error);
    }
  }

  setTimer() {
    timer = setTimeout(() => this.getCurrentLocation(), 20000);
  }

  updateLocation = async () => {
    await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('guardWatch').doc(`${this.state.user.guardNum}`).set({
      name: this.state.user.name,
      lastName: this.state.user.lastName,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      dateInit: this.state.initDate.toString(),
      guardNum: this.state.user.guardNum,
      isFinish: false
    }).then(() => {
      this.setTimer();
    })
    .catch((err) => {
      Alert.alert("Error found: ", err)
      console.error("Error found: ", err);
    });
  };

  validate() {
    const {title, comment} = this.state;
    if(title.trim().length == 0){
      this.titleInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(comment.trim().length == 0){
      this.commentInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(title.trim().length != 0 && comment.trim().length != 0) {
      this.createIncident();
    }
    else
    {
      this.setState({ errorData: true});
    }
  }

  createWatch() {
    clearTimeout(timer);
    let endDate= moment().format('DD-MM-YYYY - HH:mm');
    this.setState({ endDate: endDate })
    let fullDate = `${this.state.user.guardNum} - ${this.state.initDate.toString()}`;
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('guardWatch').doc(`${fullDate}`).set({//modificar aqui
        name: this.state.user.name,
        lastName: this.state.user.lastName,
        dateInit: this.state.initDate.toString(),
        dateEnd: endDate,
        checkDoneList: this.state.checkDoneList,
        isFinish: true
    }).then((res) => {
      firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("guardWatch").doc(this.state.user.guardNum).delete()
      .then((res) => {
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
      Alert.alert("Fereg SR","Rondín creado exitosamente");
    this.setState({ error: false});
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({ error: true});
    });
  }

  onPress = () => {
    this.setState({ isCar: !this.state.isCar });
  };

  createIncident() {
    var invitationId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i <= 10; i++) {
      invitationId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ incidentNumber: invitationId });
    this.setState({ showLoader: false });
    //date: this.state.date,
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('incident').doc(`${this.state.incidentNumber}`).set({
      title: this.state.title,
      date: this.state.date,
      comment: this.state.comment,
      incidentNumber: this.state.incidentNumber
    }).then((res) => {
      this.setState({
      title: '',
      comment: '',
      });
      Alert.alert("Fereg SR","Incidente creado exitosamente");
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({ error: true});
    });
  }

  async showImagePicker() {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Fereg SR','Aún no has aceptado los permisos para acceder a tus fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.setState({ showLoader: true });
      this.setState({ disable: true });
      this.uploadImage(result);
    }
  }

  async takePicture() {
    await Permissions.askAsync(Permissions.CAMERA);
    try {
      let result = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri  });
        this.uploadImage(result);
        this.setState({ showLoader: true });
        this.setState({ disable: true });
      }
    } catch (E) {
        console.warn(E);
    }
  }

  uploadImage = async(image) => {
    if(image) {
      let manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
      );
      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`incidents/${this.state.title}-incident`);
      const task = storageRef.put(blob)

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ disable: false });
          this.setState({ showLoader: false });
          this.setState({ photoCredentialUrl: res });
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  onPress = () => {
    this.setState({ hasIncident: !this.state.hasIncident });
  };

  async changeCheck(check, isDone) {
    if(isDone === true){
      this.state.checkDoneList.push(check)
    }
    await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('check').doc(check.checkNum).update({
      isDone: isDone
    }).then(() => {
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({ error: true});
    });
  }

  render() {
    return (
     <SafeAreaView style={styles.container}>
      <CustomHeader title={'Rondin'}/>
        <ScrollView style={styles.scroll}>
            <View style={styles.playerInfo}>
              <View style={styles.dataContainer}>
                <Text style={styles.dataText}>Guardia: </Text>
                <Text style={styles.dataInfo}>{`${this.state.user.name} ${this.state.user.lastName}`}</Text>
              </View>
              <View style={styles.divider}/>
            </View>
            {/* map */}
            {
              this.state.latitude
              ? <MapView 
                  initialRegion={this.state.region}
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
                  {/* <Marker
                    coordinate={{
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                    }}
                  /> */}
                </MapView>
              : <View style={styles.loaderContainer}>
                  <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
                </View>
            }
            <Text style={styles.date}>Inicio de rondín</Text>
            {
              this.state.initDate
              ? <Text style={styles.dateText}>{this.state.initDate}</Text>
              : <Text style={styles.dateText}>--</Text>
            }
            <Text style={styles.date}>Termino de rondín</Text>
            {
              this.state.endDate
              ? <Text style={styles.dateText}>{this.state.endDate}</Text>
              : <Text style={styles.dateText}>--</Text>
            }
            {
              this.state.checkList.map((check, i) => (
                <View style={styles.checkboxContainer} key={i}>
                  <RNCheckboxCard
                    style={styles.checkbox}
                    text={`${check.name} - ${check.initDate}`}
                    onPress={(isDone) => this.changeCheck(check, isDone)}
                    darkMode={true}
                    quantity={check.description}
                    sortIconImageSource=''
                    enableQuantityText={true}
                    textStyle={{color: COLORS.darkPrimary}}
                  />
                </View>
              ))
            }
            <View style={styles.switch}>
              <Text style={styles.car}>Incidente: </Text>
              <SwitchToggle
                containerStyle={{
                  marginLeft: 10,
                  width: 68,
                  height: 28,
                  borderRadius: 25,
                  backgroundColor: COLORS.black,
                }}
                backgroundColorOn={COLORS.lightGray}
                backgroundColorOff={COLORS.lightGray}
                circleStyle={{
                  width: 28,
                  height: 28,
                  borderRadius: 19,
                  backgroundColor: COLORS.black
                }}
                switchOn={this.state.hasIncident}
                onPress={this.onPress}
                circleColorOff={COLORS.accent}
                circleColorOn={COLORS.darkPrimary}
                duration={500}
              />
            </View>
            {
              this.state.hasIncident
              ? <View>
                  <View style={styles.inputView} ref={r=>this.titleInput=r}>
                    <TextInput  
                      style={styles.inputText}
                      placeholder="Título" 
                      placeholderTextColor={COLORS.black}
                      onChangeText={text => this.setState({ title: text })}
                      value={this.state.title}
                    />
                  </View>
                  <View style={styles.commentView} ref={r=>this.commentInput=r}>
                    <TextInput  
                      style={styles.commentText}
                      placeholder="Comentario (Lim. 150)" 
                      placeholderTextColor={COLORS.black}
                      multiline = {true}
                      numberOfLines = {4}
                      maxLength = {150}
                      onChangeText={text => this.setState({ comment: text })}
                      value={this.state.comment}
                    />
                  </View>
                  <View>
                    <Text style={styles.title}>Imagen de incidente</Text>
                    <TouchableOpacity onPress={() => this.takePicture()}>
                      <View style={styles.imageContainer}>
                        {
                          this.state.image
                          ? <Image style={styles.image} source={{uri: `${this.state.image}`}} />
                          : <Ionicons name="camera-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                        }
                      </View>
                    </TouchableOpacity>
                  </View>
                  {
                    this.state.error
                    ? <Text style={styles.error}>Error al guardar la información</Text>
                    : null
                  }
                  {
                    this.state.errorData
                    ? <Text style={styles.error}>Por favor ingresa los datos</Text>
                    : null
                  }
                  {
                    this.state.noData
                    ? <Text style={styles.noData}>Aún no hay tareas</Text>
                    : null
                  }
                  {
                    this.state.showLoader
                    ? <View style={styles.loaderContainer}>
                        <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
                        <Text style={styles.saveText}>Guardando imagen</Text>
                      </View>
                    : null
                  }
                  <TouchableOpacity
                    style={styles.btnCreate}
                    onPress={() => this.validate()}
                  >
                    <Text style={styles.createText}>Crear incidente</Text>
                  </TouchableOpacity>
                </View>
              : null
            }
            <View style={styles.dateContainer}>
              {
                this.state.initDate
                ? <TouchableOpacity
                style={styles.btnCreate}
                onPress={() => this.createWatch()}
              >
                <Text style={styles.createText}>Terminar</Text>
              </TouchableOpacity>
                :<TouchableOpacity
                style={styles.btnCreate}
                onPress={() =>  this.getCurrentLocation()}
              >
                <Text style={styles.createText}>Iniciar</Text>
              </TouchableOpacity>
              } 


              {/* <TouchableOpacity
                style={styles.btnCreate}
                onPress={() => this.createWatch()}
              >
                <Text style={styles.createText}>Terminar</Text>
              </TouchableOpacity> */}
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray
  },
  title: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
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
  btnCreate: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  btnCreateInci: {
    width: "40%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  dataText: {
    color: COLORS.gray,
    fontSize: 15
  },
  dataInfo: {
    fontSize: 16,
    color: COLORS.darkPrimary,
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
  map: {
    width: "90%",
    borderRadius: 25,
    height: 200,
    justifyContent: "center",
    alignSelf: 'center',
    padding: 20,
    marginBottom: 11
  },
  check: {
    width: "50%",
    height: 50,
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dateText: {
    fontWeight: 'bold',
    color: COLORS.white,
    alignSelf: 'center'
  },
  createText: {
    color: COLORS.primary,
  },
  date: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: COLORS.darkPrimary,
    fontSize: 16,
  },
  switch: {
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
    flexDirection: 'row'
  },
  car: {
  marginTop: 5,
  fontSize: 16,
  color: COLORS.darkPrimary,
  },
  title: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
  },
  inputView: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: 'center',
    padding: 20
  },
  commentView: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    height: 150,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: COLORS.black
  },
  commentText: {
    height: 150,
    color: COLORS.black
  },
  optionButtonIcon: {
    width: 42,
    marginHorizontal: 4,
    marginTop: -5
  },
  error: {
    textAlign: 'center',
    color: COLORS.error,
    marginTop: 8
  },
  optionButtonIcon: {
    width: '50%',
    marginLeft: '15%'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
  },
  loaderContainer: {
    alignSelf: 'center',
    marginTop: 16
  },
  saveText: {
    color: COLORS.darkPrimary
  },
  incidentContainer: {
    marginTop: 16
  },
  checkboxContainer: {
    alignSelf: 'center',
    marginBottom: 5
  },
  noData: {
    color: COLORS.darkPrimary,
    textAlign: 'center',
    fontSize: 10
  }
});

  export default GuardWatchDetail;
  
