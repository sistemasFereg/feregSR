import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import { COLORS } from '../../../assets/styles/variables';
import CustomDatePicker from '../../shared/datePicker/customDatePicker';
import QRCode from 'react-native-qrcode-generator';
//import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import firebase from '../../../config/firebase';
import CustomHeader from '../../../components/header';
import ViewShot from 'react-native-view-shot';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';

class InternalServiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      internalService: [],
      name: '',
      lastName: '',
      personNum: '',
      house: '',
      type: '',
      hasCar: false,
      plates: '',
      brand: '',
      color: '',
      qrCode: '',
      internalServiceNumber: '',
      mondayInit: '',
      mondayEnd: '',
      mondayLimit: '',
      tuesdayInit: '',
      tuesdayEnd: '',
      tuesdayLimit: '',
      wednesdayInit: '',
      wednesdayEnd: '',
      wednesdayLimit: '',
      thursdayInit: '',
      thursdayEnd: '',
      thursdayLimit: '',
      fridayInit: '',
      fridayEnd: '',
      fridayLimit: '',
      saturdayInit: '',
      saturdayEnd: '',
      saturdayLimit: '',
      sundayInit: '',
      sundayEnd: '',
      sundayLimit: '',
      image: '',
      photoUrl: '',
      error: false,
      errorData: false,
      disable: false,
      isCondominium: false,
      showLoader: false,
      cretaeDate: null,
      errorDate: '',
    };
  }

  componentDidMount() {
    console.log(this.props)
    if(this.props.internalService) {
      this.setState({ internalService: this.props.internalService });
      this.setState({ name: this.props.internalService.name });
      this.setState({ lastName: this.props.internalService.lastName });
      this.setState({ internalServiceNumber: this.props.internalService.internalServiceNumber });
      this.setState({ house: this.props.internalService.house ? this.props.internalService.house : null});
      this.setState({ mondayInit: this.props.internalService.mondayInit });
      this.setState({ mondayEnd: this.props.internalService.mondayInit });
      this.setState({ mondayLimit: this.props.internalService.mondayLimit });
      this.setState({ tuesdayInit: this.props.internalService.tuesdayInit });
      this.setState({ tuesdayEnd: this.props.internalService.tuesdayEnd });
      this.setState({ tuesdayLimit: this.props.internalService.tuesdayLimit });
      this.setState({ wednesdayInit: this.props.internalService.wednesdayInit });
      this.setState({ wednesdayEnd: this.props.internalService.wednesdayEnd });
      this.setState({ wednesdayLimit: this.props.internalService.wednesdayLimit });
      this.setState({ thursdayInit: this.props.internalService.thursdayInit });
      this.setState({ thursdayEnd: this.props.internalService.thursdayEnd });
      this.setState({ thursdayLimit: this.props.internalService.thursdayLimit });
      this.setState({ fridayInit: this.props.internalService.fridayInit });
      this.setState({ fridayEnd: this.props.internalService.fridayEnd });
      this.setState({ fridayLimit: this.props.internalService.fridayLimit });
      this.setState({ saturdayInit: this.props.internalService.saturdayInit });
      this.setState({ saturdayEnd: this.props.internalService.saturdayEnd });
      this.setState({ saturdayLimit: this.props.internalService.saturdayLimit });
      this.setState({ sundayInit: this.props.internalService.sundayInit });
      this.setState({ sundayEnd: this.props.internalService.sundayEnd });
      this.setState({ sundayLimit: this.props.internalService.sundayLimit });
      this.setState({ isCondominium: this.props.internalService.isCondominium });
      this.setState({ image: this.props.internalService.photo });
      if(this.props.internalService.hasCar) {
        this.setState({ hasCar: true });
        this.setState({ internalService: this.props.internalService });
        this.setState({ name: this.props.internalService.name });
        this.setState({ lastName: this.props.internalService.lastName });
        this.setState({ internalServiceNumber: this.props.internalService.internalServiceNumber });
        this.setState({ house: this.props.internalService.house ? this.props.internalService.house : null });
        this.setState({ brand: this.props.internalService.brand });
        this.setState({ plates: this.props.internalService.plates });
        this.setState({ color: this.props.internalService.color });
        this.setState({ mondayInit: this.props.internalService.mondayInit });
        this.setState({ mondayEnd: this.props.internalService.mondayInit });
        this.setState({ mondayLimit: this.props.internalService.mondayLimit });
        this.setState({ tuesdayInit: this.props.internalService.tuesdayInit });
        this.setState({ tuesdayEnd: this.props.internalService.tuesdayEnd });
        this.setState({ tuesdayLimit: this.props.internalService.tuesdayLimit });
        this.setState({ wednesdayInit: this.props.internalService.wednesdayInit });
        this.setState({ wednesdayEnd: this.props.internalService.wednesdayEnd });
        this.setState({ wednesdayLimit: this.props.internalService.wednesdayLimit });
        this.setState({ thursdayInit: this.props.internalService.thursdayInit });
        this.setState({ thursdayEnd: this.props.internalService.thursdayEnd });
        this.setState({ thursdayLimit: this.props.internalService.thursdayLimit });
        this.setState({ fridayInit: this.props.internalService.fridayInit });
        this.setState({ fridayEnd: this.props.internalService.fridayEnd });
        this.setState({ fridayLimit: this.props.internalService.fridayLimit });
        this.setState({ saturdayInit: this.props.internalService.saturdayInit });
        this.setState({ saturdayEnd: this.props.internalService.saturdayEnd });
        this.setState({ saturdayLimit: this.props.internalService.saturdayLimit });
        this.setState({ sundayInit: this.props.internalService.sundayInit });
        this.setState({ sundayEnd: this.props.internalService.sundayEnd });
        this.setState({ sundayLimit: this.props.internalService.sundayLimit });
        this.setState({ isCondominium: this.props.internalService.isCondominium });
        this.setState({ image: this.props.internalService.photo });
      }
    }
    if(this.props.user.userType === 'admin'){
      this.setState({ isCondominium: true });
      this.setState({ type: this.props.internalService.type });
      this.setState({ internalService: this.props.internalService });
    }
  }

  onPress = () => {
    this.setState({ hasCar: !this.state.hasCar });
  };

  validate() {
    const {name, lastName, plates, brand, color, internalServiceNumber, house} = this.state;
    if(name.trim().length == 0){
      this.nameInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(lastName.trim().length == 0){
      this.lastNameInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(internalServiceNumber.trim().length == 0){
      this.internalServiceNumberInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(this.props.user.userType != 'admin') {
      if(house.trim().length == 0){
        this.houseInput.setNativeProps({
          borderColor: COLORS.accent,
          borderWidth:1
        });
      }
    }
    if(plates.trim().length == 0 && this.state.hasCar){
      this.platesInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(brand.trim().length == 0 && this.state.hasCar){
      this.brandInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(color.trim().length == 0 && this.state.hasCar){
      this.colorInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(!this.state.hasCar && this.props.user.userType != 'admin') {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        internalServiceNumber.trim().length != 0 &&
        house.trim().length != 0) {
          this.setState({ errorData: false});
        this.createInternalService();
      }
      else{
        this.setState({ errorData: true});
      }
    }
    if(this.state.hasCar && this.props.user.userType != 'admin') {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        internalServiceNumber.trim().length != 0 &&
        house.trim().length != 0 &&
        plates.trim().length != 0 &&
        brand.trim().length != 0 &&
        color.trim().length != 0) {
          this.setState({ errorData: false});
        this.createInternalService();
      }
      else
      {
        this.setState({ errorData: true});
      }
    }
    if(!this.state.hasCar && this.props.user.userType === 'admin') {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        internalServiceNumber.trim().length != 0) {
          this.setState({ errorData: false});
        this.createInternalService();
      }
      else{
        this.setState({ errorData: true});
      }
    }
    if(this.state.hasCar && this.props.user.userType === 'admin') {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        internalServiceNumber.trim().length != 0 &&
        plates.trim().length != 0 &&
        brand.trim().length != 0 &&
        color.trim().length != 0) {
          this.setState({ errorData: false});
        this.createInternalService();
      }
      else
      {
        this.setState({ errorData: true});
      }
    }
  }

  createInternalService() {
    this.setState({ disable: true });
    this.refs.viewShot.capture().then(uri => {
      this.uploadImageProfile(this.state.image, uri);       
    })
    .catch(error => console.log(error));
  }

  uploadImage = async(imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    var storageRef = await firebase.storage().ref(`QRCodes/${this.state.internalServiceNumber}`);
    const task = storageRef.put(blob)

    task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({qrCode: res})
          if(!this.state.hasCar) {
            let createDate= moment().format('DD-MM-YYYY - HH:mm');
            firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('personal').doc(`${this.state.internalServiceNumber}`).set({
              name: this.state.name,
              lastName: this.state.lastName,
              internalServiceNumber: this.state.internalServiceNumber,
              house: this.props.user.userType != 'admin' ? this.state.house : null,
              hasCar: this.state.hasCar,
              qrCode: res,
              mondayInit: this.state.mondayInit,
              mondayEnd: this.state.mondayEnd,
              mondayLimit: this.state.mondayLimit,
              tuesdayInit: this.state.tuesdayInit,
              tuesdayEnd: this.state.tuesdayEnd,
              tuesdayLimit: this.state.tuesdayLimit,
              wednesdayInit: this.state.wednesdayInit,
              wednesdayEnd: this.state.wednesdayEnd,
              wednesdayLimit: this.state.wednesdayLimit,
              thursdayInit: this.state.thursdayInit,
              thursdayEnd: this.state.thursdayEnd,
              thursdayLimit: this.state.thursdayLimit,
              fridayInit: this.state.fridayInit,
              fridayEnd: this.state.fridayEnd,
              fridayLimit: this.state.fridayLimit,
              saturdayInit: this.state.saturdayInit,
              saturdayEnd: this.state.saturdayEnd,
              saturdayLimit: this.state.saturdayLimit,
              sundayInit: this.state.sundayInit,
              sundayEnd: this.state.sundayEnd,
              sundayLimit: this.state.sundayLimit,
              isCondominium: this.state.isCondominium,
              type: this.props.user.userType === 'admin' ? this.state.type : null,
              createDate: createDate,
              photo: this.state.photoUrl
            }).then(() => {
              firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('qrCode').doc().set({
                internalServiceNumber: this.state.internalServiceNumber,
                qrCode: res,
                codeNum: this.state.internalServiceNumber,
                houseNum: this.props.user.userType != 'admin' ? this.state.house : null,
                userType: 'internalService',
                mondayInit: this.state.mondayInit,
                mondayEnd: this.state.mondayEnd,
                mondayLimit: this.state.mondayLimit,
                tuesdayInit: this.state.tuesdayInit,
                tuesdayEnd: this.state.tuesdayEnd,
                tuesdayLimit: this.state.tuesdayLimit,
                wednesdayInit: this.state.wednesdayInit,
                wednesdayEnd: this.state.wednesdayEnd,
                wednesdayLimit: this.state.wednesdayLimit,
                thursdayInit: this.state.thursdayInit,
                thursdayEnd: this.state.thursdayEnd,
                thursdayLimit: this.state.thursdayLimit,
                fridayInit: this.state.fridayInit,
                fridayEnd: this.state.fridayEnd,
                fridayLimit: this.state.fridayLimit,
                saturdayInit: this.state.saturdayInit,
                saturdayEnd: this.state.saturdayEnd,
                saturdayLimit: this.state.saturdayLimit,
                sundayInit: this.state.sundayInit,
                sundayEnd: this.state.sundayEnd,
                sundayLimit: this.state.sundayLimit,
                isCondominium: this.state.isCondominium,
                type: this.props.user.userType === 'admin' ? this.state.type : null,
                photo: this.state.photoUrl
              }).then((res) => {

              })
              .catch((err) => {
                console.error("Error found: ", err);
              });
              this.setState({
                internalServiceNumber: '',
                mondayInit: '',
                mondayEnd: '',
                mondayLimit: '',
                tuesdayInit: '',
                tuesdayEnd: '',
                tuesdayLimit: '',
                wednesdayInit: '',
                wednesdayEnd: '',
                wednesdayLimit: '',
                thursdayInit: '',
                thursdayEnd: '',
                thursdayLimit: '',
                fridayInit: '',
                fridayEnd: '',
                fridayLimit: '',
                saturdayInit: '',
                saturdayEnd: '',
                saturdayLimit: '',
                sundayInit: '',
                sundayEnd: '',
                sundayLimit: '',
                name: '',
                lastName: '',
                personNum: '',
                house: '',
                plates: '',
                brand: '',
                color: '',
              });
              Alert.alert("Fereg SR","Personal creado exitosamente");//alert
              this.setState({ error: false});
              this.setState({ disable: false });
              this.setState({ showLoader: false });
            })
            .catch((err) => {
              console.error("Error found: ", err);
              this.setState({ error: true});
            });
          }
          else {
            firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('personal').doc(`${this.state.internalServiceNumber}`).set({
              name: this.state.name,
              lastName: this.state.lastName,
              internalServiceNumber: this.state.internalServiceNumber,
              house: this.props.user.userType != 'admin' ? this.state.house : null,
              hasCar: this.state.hasCar,
              plates: this.state.plates,
              brand: this.state.brand,
              color: this.state.color,
              qrCode: res,
              mondayInit: this.state.mondayInit,
              mondayEnd: this.state.mondayEnd,
              mondayLimit: this.state.mondayLimit,
              tuesdayInit: this.state.tuesdayInit,
              tuesdayEnd: this.state.tuesdayEnd,
              tuesdayLimit: this.state.tuesdayLimit,
              wednesdayInit: this.state.wednesdayInit,
              wednesdayEnd: this.state.wednesdayEnd,
              wednesdayLimit: this.state.wednesdayLimit,
              thursdayInit: this.state.thursdayInit,
              thursdayEnd: this.state.thursdayEnd,
              thursdayLimit: this.state.thursdayLimit,
              fridayInit: this.state.fridayInit,
              fridayEnd: this.state.fridayEnd,
              fridayLimit: this.state.fridayLimit,
              saturdayInit: this.state.saturdayInit,
              saturdayEnd: this.state.saturdayEnd,
              saturdayLimit: this.state.saturdayLimit,
              sundayInit: this.state.sundayInit,
              sundayEnd: this.state.sundayEnd,
              sundayLimit: this.state.sundayLimit,
              photo: this.state.photoUrl ? this.state.photoUrl : null,
              isCondominium: this.state.isCondominium,
              type: this.props.user.userType === 'admin' ? this.state.type : null,
              photo: this.state.photoUrl
            }).then(() => {
              firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('qrCode').doc().set({
                internalServiceNumber: this.state.internalServiceNumber,
                qrCode: res,
                codeNum: this.state.internalServiceNumber,
                houseNum: this.props.user.userType != 'admin' ? this.state.house : null,
                userType: 'internalService',
                mondayInit: this.state.mondayInit,
                mondayEnd: this.state.mondayEnd,
                mondayLimit: this.state.mondayLimit,
                tuesdayInit: this.state.tuesdayInit,
                tuesdayEnd: this.state.tuesdayEnd,
                tuesdayLimit: this.state.tuesdayLimit,
                wednesdayInit: this.state.wednesdayInit,
                wednesdayEnd: this.state.wednesdayEnd,
                wednesdayLimit: this.state.wednesdayLimit,
                thursdayInit: this.state.thursdayInit,
                thursdayEnd: this.state.thursdayEnd,
                thursdayLimit: this.state.thursdayLimit,
                fridayInit: this.state.fridayInit,
                fridayEnd: this.state.fridayEnd,
                fridayLimit: this.state.fridayLimit,
                saturdayInit: this.state.saturdayInit,
                saturdayEnd: this.state.saturdayEnd,
                saturdayLimit: this.state.saturdayLimit,
                sundayInit: this.state.sundayInit,
                sundayEnd: this.state.sundayEnd,
                sundayLimit: this.state.sundayLimit,
                isCondominium: this.state.isCondominium,
                type: this.props.user.userType === 'admin' ? this.state.type : null,
                photo: this.state.photoUrl
              }).then((res) => {
                
              })
              .catch((err) => {
                console.error("Error found: ", err);
              });
              Alert.alert("Fereg SR","Personal creado exitosamente");
              this.setState({ error: false });
              this.setState({ disable: false });
              this.setState({ showLoader: false });
              this.setState({
                internalServiceNumber: '',
                 mondayInit: '',
                 mondayEnd: '',
                 mondayLimit: '',
                 tuesdayInit: '',
                 tuesdayEnd: '',
                 tuesdayLimit: '',
                 wednesdayInit: '',
                 wednesdayEnd: '',
                 wednesdayLimit: '',
                 thursdayInit: '',
                 thursdayEnd: '',
                 thursdayLimit: '',
                 fridayInit: '',
                 fridayEnd: '',
                 fridayLimit: '',
                 saturdayInit: '',
                 saturdayEnd: '',
                 saturdayLimit: '',
                 sundayInit: '',
                 sundayEnd: '',
                 sundayLimit: '',
                 name: '',
                 lastName: '',
                 personNum: '',
                 house: '',
                 plates: '',
                 brand: '',
                 color: '',
               });
            })
            .catch((err) => {
              this.setState({ error: true });
              console.error("Error found: ", err);
            });
          }
        })
        .catch(error => {
          console.log(error)
        });   
      })
  }

  /**
   * Get's selected value from custom input text
   * @param {string} date
   * @param {string} day day identifier
  */
  alarma(){
    Alert.alert('fecha invalida');
  }

  getDate = (date, day) => {
    if(day === 'mondayInit') {
      this.setState({ mondayInit: date});
    }
    if(day === 'mondayEnd') {
      // if(this.state.mondayInit < this.state.mondayEnd){
      //   this.setState({errorDate: 'Fecha invalida'});
      // }
      // else{
      this.setState({ mondayEnd: date});
      //   this.setState({errorDate: ''});
        
      // }
    }
    if(day === 'mondayLimit') {
      // if(this.state.mondayEnd < this.state.mondayLimit && this.state.mondayInit > this.state.mondayLimit){
      //   this.setState({errorDate: 'Fecha invalida'});
      // }
      // else{
      this.setState({ mondayLimit: date});
      //   this.setState({errorDate: ''});
      // }
    }
    if(day === 'tuesdayInit') {
      this.setState({ tuesdayInit: date});
    }
    if(day === 'tuesdayEnd') {
      this.setState({ tuesdayEnd: date});
    }
    if(day === 'tuesdayLimit') {
      this.setState({ tuesdayLimit: date});
    }
    if(day === 'wednesdayInit') {
      this.setState({ wednesdayInit: date});
    }
    if(day === 'wednesdayEnd') {
      this.setState({ wednesdayEnd: date});
    }
    if(day === 'wednesdayLimit') {
      this.setState({ wednesdayLimit: date});
    }
    if(day === 'thursdayInit') {
      this.setState({ thursdayInit: date});
    }
    if(day === 'thursdayEnd') {
      this.setState({ thursdayEnd: date});
    }
    if(day === 'thursdayLimit') {
      this.setState({ thursdayLimit: date});
    }
    if(day === 'fridayInit') {
      this.setState({ fridayInit: date});
    }
    if(day === 'fridayEnd') {
      this.setState({ fridayEnd: date});
    }
    if(day === 'fridayLimit') {
      this.setState({ fridayLimit: date});
    }
    if(day === 'saturdayInit') {
      this.setState({ saturdayInit: date});
    }
    if(day === 'saturdayEnd') {
      this.setState({ saturdayEnd: date});
    }
    if(day === 'saturdayLimit') {
      this.setState({ saturdayLimit: date});
    }
    if(day === 'sundayInit') {
      this.setState({ sundayInit: date});

    }
    if(day === 'sundayEnd') {
      this.setState({ sundayEnd: date});
    }
    if(day === 'sundayLimit') {
      this.setState({ sundayLimit: date});
    }
  }
    
  async openShareScreen() {
    if(this.state.internalServiceNumber || this.state.provider.internalServiceNumber) {
      this.refs.viewShot.capture().then(uri => {
        FileSystem.readAsStringAsync(uri,{ encoding: 'base64' }).then((res) => {
          let urlString = 'data:image/jpeg;base64,' + res;
          let options = {
            title: 'Share Title',
            message: 'Share Message',
            url: urlString,
            type: 'image/jpeg',
          };
          Share.share(options)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log(err);
            });
        });
      })
      .catch(error => console.log(error))
    }
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
      quality: 0.1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  async openCamera() {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Fereg SR','Aún no has aceptado los permisos para acceder a la camara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  async uploadImageProfile(image, uri) {
    this.setState({ showLoader: true });
    if(image) {
      const response = await fetch(image);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`users/${this.state.internalServiceNumber}`);
      const task = storageRef.put(blob);

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.uploadImage(uri);
          this.setState({ photoUrl: res });
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
    else {
      this.uploadImage(uri);
    }
  }

  render() {
    console.log('Monday init date: >> ',this.state.mondayInit)
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Crear Servicio"}/>
        <ScrollView style={styles.scroll}>
        <View style={styles.imageFrame}>
            <Image
              style={styles.image}
              source={this.state.image ? {uri: this.state.image} : require('../../../assets/images/user.png')}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.addButton} >
                <TouchableOpacity
                  onPress={() => this.showImagePicker()}
                >
                  <Ionicons name="images" color={COLORS.darkPrimary} size={26} style={styles.icon}/>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.openCamera()}
                >
                  <Ionicons name="camera" color={COLORS.darkPrimary} size={30}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputView} ref={r=>this.nameInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Nombre" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({name:text})}
              value={this.state.name}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.lastNameInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Apellido" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({lastName:text})}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.internalServiceNumberInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Número de personal" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({internalServiceNumber:text})}
              value={this.state.internalServiceNumber}
            />
          </View>
          {
            this.props.user.userType === 'admin'
            ? null
            : <View style={styles.inputView} ref={r=>this.houseInput=r}>
                <TextInput  
                  style={styles.inputText}
                  placeholder="Casa" 
                  placeholderTextColor={COLORS.black}
                  onChangeText={text => this.setState({house:text})}
                  value={this.state.house}
                />
              </View>
          }
          {
            this.props.user.userType === 'admin'
            ? <View style={styles.inputView} ref={r=>this.typeInput=r}>
                <TextInput  
                  style={styles.inputText}
                  placeholder="Tipo" 
                  placeholderTextColor={COLORS.black}
                  onChangeText={text => this.setState({type:text})}
                  value={this.state.type}
                />
              </View>
            : null
          }
          <View style={styles.switch}>
            <Text style={styles.car}>Auto: </Text>
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
              switchOn={this.state.hasCar}
              onPress={this.onPress}
              circleColorOff={COLORS.accent}
              circleColorOn={COLORS.darkPrimary}
              duration={500}
            />
          </View>
          {
            this.state.hasCar
            ? <View>
                <View style={styles.inputView} ref={r=>this.platesInput=r}>
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Placas" 
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => this.setState({plates:text})}
                    value={this.state.plates}
                  />
                </View>
                <View style={styles.inputView} ref={r=>this.brandInput=r}>
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Marca" 
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => this.setState({brand:text})}
                    value={this.state.brand}
                  />
                </View>
                <View style={styles.inputView} ref={r=>this.colorInput=r}>
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Color" 
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => this.setState({color:text})}
                    value={this.state.color}
                  />
                </View>
              </View>
            : null
          }
          {
            this.props.internalService
            ? <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.rowTitle}>Día</Text>
                  <Text style={styles.rowTitle}>Entrada</Text>
                  <Text style={styles.rowTitle}>Salida</Text>
                  <Text style={styles.rowTitle}>Limite de entrada</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Lunes</Text>
                  <View style={styles.rowText}>
                    
                    <CustomDatePicker value={this.props.internalService.mondayInit} getDate={this.getDate} day='mondayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value={this.props.internalService.mondayEnd} getDate={this.getDate} day='mondayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value={this.props.internalService.mondayLimit} getDate={this.getDate} day='mondayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Martes</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.tuesdayInit} getDate={this.getDate} day='tuesdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.tuesdayEnd} getDate={this.getDate} day='tuesdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.tuesdayLimit} getDate={this.getDate} day='tuesdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Miercoles</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.wednesdayInit} getDate={this.getDate} day='wednesdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.wednesdayEnd} getDate={this.getDate} day='wednesdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.wednesdayLimit} getDate={this.getDate} day='wednesdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Jueves</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.thursdayInit} getDate={this.getDate} day='thursdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.thursdayEnd} getDate={this.getDate} day='thursdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.thursdayLimit} getDate={this.getDate} day='thursdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Viernes</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.fridayInit} getDate={this.getDate} day='fridayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.fridayEnd} getDate={this.getDate} day='fridayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.fridayLimit} getDate={this.getDate} day='fridayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Sabado</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.saturdayInit} getDate={this.getDate} day='saturdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.saturdayEnd} getDate={this.getDate} day='saturdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.saturdayLimit} getDate={this.getDate} day='saturdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Domingo</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.sundayInit} getDate={this.getDate} day='sundayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.sundayEnd} getDate={this.getDate} day='sundayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.props.internalService.sundayLimit} getDate={this.getDate} day='sundayLimit'/>
                  </View>
                </View>
              </View>
            : <View style={styles.table}>
                <View style={styles.row}>
                  <Text style={styles.rowTitle}>Día</Text>
                  <Text style={styles.rowTitle}>Entrada</Text>
                  <Text style={styles.rowTitle}>Salida</Text>
                  <Text style={styles.rowTitle}>Limite de entrada</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Lunes</Text>
                  <View style={styles.rowText}>
                    
                    <CustomDatePicker value={this.state.mondayInit} getDate={this.getDate} day='mondayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value={this.state.mondayEnd} getDate={this.getDate} day='mondayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value={this.state.mondayLimit} getDate={this.getDate} day='mondayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Martes</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.tuesdayInit} getDate={this.getDate} day='tuesdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.tuesdayEnd} getDate={this.getDate} day='tuesdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.tuesdayLimit} getDate={this.getDate} day='tuesdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Miercoles</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.wednesdayInit} getDate={this.getDate} day='wednesdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.wednesdayEnd} getDate={this.getDate} day='wednesdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.wednesdayLimit} getDate={this.getDate} day='wednesdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Jueves</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.thursdayInit} getDate={this.getDate} day='thursdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.thursdayEnd} getDate={this.getDate} day='thursdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.thursdayLimit} getDate={this.getDate} day='thursdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Viernes</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.fridayInit} getDate={this.getDate} day='fridayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.fridayEnd} getDate={this.getDate} day='fridayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.fridayLimit} getDate={this.getDate} day='fridayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Sabado</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.saturdayInit} getDate={this.getDate} day='saturdayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.saturdayEnd} getDate={this.getDate} day='saturdayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.saturdayLimit} getDate={this.getDate} day='saturdayLimit'/>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>Domingo</Text>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.sundayInit} getDate={this.getDate} day='sundayInit'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.sundayEnd} getDate={this.getDate} day='sundayEnd'/>
                  </View>
                  <View style={styles.rowText}>
                    <CustomDatePicker value= {this.state.sundayLimit} getDate={this.getDate} day='sundayLimit'/>
                  </View>
                </View>
              </View>
          }
          
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
            this.state.errorDate
            ? <Text style={styles.error}>{`${this.state.errorDate}`}</Text>
            : null
          }
          {
            this.state.showLoader
            ? <View style={styles.loaderContainer}>
                <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
                <Text style={styles.saveText}>Guardando información</Text>
              </View>
            : null
          }
          <TouchableOpacity 
            style={styles.btnCreate}
            disabled={this.state.disable}
            onPress={() => this.validate()}
          >
            <Text style={styles.createText}>Crear</Text>
          </TouchableOpacity>
          <ViewShot style={styles.codeContainer} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
            <QRCode
              value={this.state.internalServiceNumber}
              size={200}
              bgColor='black'
              fgColor='white'
              />
          </ViewShot>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray,
    flex: 1
  },
  scroll: {
    paddingTop: 16,
    paddingBottom: 16
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
  inputText: {
    height: 50,
    color: COLORS.black
  },
  switch: {
    alignSelf: 'center',
    marginBottom: 16,
    flexDirection: 'row'
  },
  car: {
    marginTop: 5,
    color: COLORS.white
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
    marginBottom: 16
  },
  createText: {
    color: COLORS.primary,
  },
  date: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
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
  codeContainer: {
    width: 210,
    height: 210,
    alignSelf: 'center',
    padding: 6,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: COLORS.white
  },
  code: {
    alignSelf: 'center'
  },
  table: {
    width: '100%'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  rowTitle: {
    backgroundColor: COLORS.darkPrimary,
    width: '25%',
    textAlign: 'center',
    borderColor: COLORS.darkPrimary,
    borderWidth: 1,
    padding: 5,
    color: COLORS.white
  },
  rowText: {
    width: '25%',
    textAlign: 'center',
    borderColor: COLORS.darkPrimary,
    borderWidth: 1,
    padding: 10,
    color: COLORS.white
  },
  imageFrame: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  addButton: {
    marginEnd: '7%'
  },
  icon: {
    marginTop: 2
  },
  loaderContainer: {
    alignSelf: 'center',
    marginTop: 16
  },
  saveText: {
    color: COLORS.darkPrimary
  }
});

export default InternalServiceCreate;
