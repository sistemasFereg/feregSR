import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../../config/firebase';
import CustomHeader from '../../../components/header';
import * as ImageManipulator from 'expo-image-manipulator';

class CreateVisitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      isCar: false,
      photoFront: '',
      photoBack: '',
      photoCreadential: '',
      photoFrontUrl: '',
      photoBackUrl: '',
      photoCredentialUrl: '',
      isEntry: true,
      error: false,
      errorData: false,
      destination: '',
      hasCameraPermission: null,
      disable: false,
      showLoader: false,
      createDate: moment().format('DD-MM-YYYY - HH:mm'),
      visitorId: ''
    };
  }

  async componentDidMount() {
    var codigoId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i <= 10; i++) {
      codigoId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ visitorId: codigoId });

    // console.log(this.props)
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  onPress = () => {
    this.setState({ isCar: !this.state.isCar });
  };

  validate() {
    const {name, lastName, photoFront, photoBack, destination, photoCredentialUrl} = this.state;
    if(this.state.photoCredentialUrl){
   
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
    if(destination.trim().length == 0){
      this.destinationInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if (!this.state.isCar) {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        destination.trim().length != 0 ){
          this.createVisitor();
      }
    }
    else {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        destination.trim().length != 0 &&
        photoFront.trim().length != 0 &&
        photoBack.trim().length != 0) {
          this.createVisitor();
      }
      
      else {
        this.setState({ errorData: true});
      }
    }
  }
  else {
    this.setState({ errorData: true});
  }
  }

  async createVisitor() {
    let createDate= moment().format('DD-MM-YYYY - HH:mm');
    if(this.state.photoCredentialUrl) {
      //if(this.state.photoFrontUrl && this.state.photoBackUrl) {
      this.setState({ showLoader: false });
      await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('visitor').doc(this.state.visitorId).set({
        name: this.state.name,
        lastName: this.state.lastName,
        destination: this.state.destination,
        photoFront: this.state.photoFrontUrl ?this.state.photoFrontUrl :null,
        photoBack: this.state.photoBackUrl ? this.state.photoBackUrl :null,
        photoCredential: this.state.photoCredentialUrl,
        createDate: createDate,
        visitorId: this.state.visitorId
      }).then((res) => {
        this.setState({
          name: '',
          lastName: '',
          destination:'',
          photoBack: '',
          photoBackUrl: '',
          photoCredential: '',
          photoCredentialUrl: '',
          photoFront: '',
          photoFrontUrl: ''
        });
        Alert.alert("Fereg SR", "Visitante creado");
        this.setState({ error: false});
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({ error: true});
      }); 
    }
  }

  uploadFrontImage = async(image) => {
    if(image) {
      let manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
      );
      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`visitors/${this.state.name} ${this.state.lastName}-front`);
      const task = storageRef.put(blob)
      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ disable: false });
          this.setState({ photoFrontUrl: res });
          this.setState({ showLoader: false});
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  uploadBackImage = async(image) => {
    if(image) {
      let manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
      );
      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`visitors/${this.state.name} ${this.state.lastName}-back`);
      const task = storageRef.put(blob)

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ disable: false });
          this.setState({ photoBackUrl: res });
          this.setState({ showLoader: false});
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  uploadCredentialImage = async(image) => {
    if(image) {
      let manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
      );
      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`visitors/${this.state.name} ${this.state.lastName}-credential`);
      const task = storageRef.put(blob)

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ disable: false });
          this.setState({ photoCredentialUrl: res });
          this.setState({ showLoader: false});
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  async takeFrontPicture() {
    await Permissions.askAsync(Permissions.CAMERA);
    try {
      let result = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      });
      if (!result.cancelled) {
        this.setState({ photoFront: result.uri});
        this.uploadFrontImage(result);
        this.setState({ showLoader: true });
        this.setState({ disable: true });
      }
    } catch (E) {
        console.warn(E);
    }
  };

  async takeBackPicture() {
    await Permissions.askAsync(Permissions.CAMERA);
    try {
      let result = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      });
      if (!result.cancelled) {
        this.setState({ photoBack: result.uri});
        this.uploadBackImage(result);
        this.setState({ showLoader: true });
        this.setState({ disable: true });
      }
    } catch (E) {
        console.warn(E);
    }
  };

  async takeCredentialPicture() {
    await Permissions.askAsync(Permissions.CAMERA);
    try {
      let result = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        this.setState({ photoCredential: result.uri });
        this.uploadCredentialImage(result);
        this.setState({ showLoader: true });
        this.setState({ disable: true });
      }
    } catch (E) {
        console.warn(E);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Crear Visitante'}/>
        <ScrollView style={styles.scroll}>
        <Text style={styles.titulo}>{this.state.createDate}</Text>
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
          <View style={styles.inputView} ref={r=>this.destinationInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Destino" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({destination:text})}
              value={this.state.destination}
            />
          </View>
          {
            this.state.error
            ? <Text style={styles.error}>Error al gruardar la información</Text>
            : null
          }
          {
            this.state.errorData
            ? <Text style={styles.error}>Porfavor ingresa los datos</Text>
            : null
          }
          {
            this.state.showLoader
            ? <View style={styles.loaderContainer}>
                <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
                <Text style={styles.saveText}>Guardando imagenes</Text>
              </View>
            : null
          }
          <View>
            <Text style={styles.title}>Imagen de credencial</Text>
            <TouchableOpacity onPress={() => this.takeCredentialPicture()}>
              <View style={styles.imageContainer}>
                {
                  this.state.photoCredentialUrl
                  ? <Image style={styles.image} source={{uri: `${this.state.photoCredentialUrl}`}} />
                  : <Ionicons name="camera-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                }
              </View>
            </TouchableOpacity>
          </View>
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
              switchOn={this.state.isCar}
              onPress={this.onPress}
              circleColorOff={COLORS.accent}
              circleColorOn={COLORS.darkPrimary}
              duration={500}
            />
          </View>
          {
            this.state.isCar
            ? <View>
                <Text style={styles.title}>Imagen Frontal</Text>
                <TouchableOpacity onPress={() => this.takeFrontPicture()}>
                  <View style={styles.imageContainer}>
                    {
                      this.state.photoFront
                      ? <Image style={styles.image} source={{uri: `${this.state.photoFront}`}} />
                      : <Ionicons name="camera-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                    }
                  </View>
                </TouchableOpacity>
                <Text style={styles.title}>Imagen Trasera</Text>
                <TouchableOpacity onPress={() => this.takeBackPicture()}>
                  <View style={styles.imageContainer}>
                    {
                      this.state.photoBack
                      ? <Image style={styles.image} source={{uri: `${this.state.photoBack}`}} />
                      : <Ionicons name="camera-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                    }
                  </View>
                </TouchableOpacity>
              </View>
            : null
          }
         
          
          <TouchableOpacity 
            style={styles.btnCreate}
            onPress={() => this.validate()}
            disabled={this.state.disable}
          >
            <Text style={styles.createText}>Crear</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
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
    flexDirection: 'row',
    marginTop: 16
  },
  car: {
    marginTop: 5,
    color: COLORS.darkPrimary,
    fontSize: 15,
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
    marginBottom: 40
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
    alignSelf: 'center',
    marginTop: 16
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
  scroll: {
    paddingTop: 16
  },
  titulo: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default CreateVisitor;
