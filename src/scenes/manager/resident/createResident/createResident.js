import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Share,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { COLORS } from '../../../../assets/styles/variables';
import firebase from '../../../../config/firebase';
import QRCode from 'react-native-qrcode-generator';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import CustomHeader from '../../../../components/header/index';

class CreateResident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resident: [],
      name: '',
      lastName: '',
      email: '',
      houseNumber: '',
      phoneNumber: '',
      residentNum: '',
      showCode: false,
      message: '',
      qrCode: '',
      uri: '',
      password: '',
      passwordConfirm: '',
      error: false,
      errordata: false,
      image: '',
      photoUrl: '',
      disable: false,
      showLoader: false
    };
  }

  componentDidMount() {
    if(this.props.resident) {
      console.log('Photo: >> ',this.props.resident)
      this.setState({ resident: this.props.resident });
      this.setState({ name: this.props.resident.name });
      this.setState({ lastName: this.props.resident.lastName });
      this.setState({ email: this.props.resident.email });
      this.setState({ houseNumber: this.props.resident.houseNumber });
      this.setState({ phoneNumber: this.props.resident.phoneNumber });
      this.setState({ image: this.props.resident.photo });
    }
  }

  validate() {
    const {name, lastName, email, houseNumber, phoneNumber, password, passwordConfirm} = this.state;
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
    if(email.trim().length == 0){
      this.emailInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(houseNumber.trim().length == 0){
      this.houseInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(phoneNumber.trim().length == 0){
      this.phoneInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(password.trim().length == 0){
      this.passInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(passwordConfirm.trim().length == 0){
      this.confirmInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(name.trim().length != 0 
        && lastName.trim().length != 0 
        && email.trim().length != 0 
        && houseNumber.trim().length != 0 
        && phoneNumber.trim().length != 0 
        && password.trim().length != 0
        && passwordConfirm.trim().length != 0) {
          this.createResident(); 
    }
    else
    {
      this.setState({ errorData: true});
    }
  }

  submitSignup() {
    this.setState({ showLoader: true });
    this.setState({ disable: true });
    if(this.state.password == this.state.passwordConfirm){
      firebase.auth().setPersistence('none');
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          
        })
        .catch(error => {
          if(error.toString().includes('badly')){
            this.setState({ error: 'Ingres una dirección de email válida.' })
          }
          else if(error.toString().includes('least')){
            this.setState({ error: 'La contraseña debe de contener al menos 6 caracteres.' })
          }
          else if(error.toString().includes('already')){
            this.setState({ error: 'Este correo ya fue registrado con otra cuenta.' })
          }
          console.log(error)
          this.setState({ showLoader: false });
          this.setState({ disable: false });
        });
    }
    else {
      this.setState({ error: 'Las contraseñas no coinciden.' })
    }
  }

  createResident() {
    this.refs.viewShot.capture().then(uri => {
      this.uploadImageProfile(this.state.image, uri);
    })
    .catch(error => console.log(error));    
  }

  uploadImage = async(imageUri) => {
    this.setState({ disable: true });
    const response = await fetch(imageUri);
    const blob = await response.blob();
    var storageRef = await firebase.storage().ref(`resident/${this.state.houseNumber}`);
    const task = storageRef.put(blob)

    task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message);
      }, () => {
        // If is user update
        storageRef.getDownloadURL().then((res) => {
          firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('resident').doc(`${this.state.houseNumber}`).set({
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email,
            houseNumber: this.state.houseNumber,
            phoneNumber: this.state.phoneNumber,
            residentNum: this.state.houseNumber,
            disableResident: false,
            condominium: this.props.route.params.condominium.name,
            qrCode: res,
            photo: this.state.photoUrl,
          }).then(() => {
            firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('qrCode').doc().set({
              residentNum: this.state.houseNumber,
              qrCode: res,
              codeNum: this.state.houseNumber,
              houseNum: this.state.houseNumber,
              userType: 'resident',
            }).then(() => {
              this.setState({ disable: false });
              this.submitSignup();
            })
            .catch((err) => {
              console.error("Error found: ", err);
            });
            this.createUser();
            // this.setState({
            //   name: '',
            //   lastName: '',
            //   houseNumber: '',
            //   phoneNumber: '',
            //   residentNumber: ''
            // });
            Alert.alert("Fereg SR","Residente creado");//nuevo
            this.setState({ error: false});
          })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({ error: true});
          });
        })
        .catch(error => {
          console.log(error);
        });   
      })
  }

  async createUser() {
    await firebase.firestore().collection("user").doc(`${this.state.email}`).set({
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phoneNumber,
      condominium: this.props.route.params.condominium.name,
      userType: 'resident',
      disableResident: false,
      residentNum: this.state.houseNumber,
      photo: this.state.photoUrl,
    }).then((res) => {
      this.setState({ showLoader: false });
      this.setState({
        name: '',
        lastName: '',
        email: '',
        houseNumber: '',
        phoneNumber: '',
        residentNum: '',
        condominium: '',
        qrCode: '',
        photo: '',
      })
    })
    .catch((err) => {
      console.error("Error found: ", err);
    });
  }

  async openShareScreen() {
    if(this.state.houseNumber || this.state.resident.houseNumber) {
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
    if(image) {
      const response = await fetch(image);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`users/${this.state.houseNumber}`);
      const task = storageRef.put(blob);

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ photoUrl: res });
          this.setState({ disable: false });
          this.setState({ showLoader: false });
          this.uploadImage(uri); 
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
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Crear Residente"}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.imageFrame}>
            <Image
              style={styles.image}
              source={this.state.image ? {uri: this.state.image} : require('../../../../assets/images/user.png')}
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
              placeholder={'Nombre'}
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({name:text})}
              value={this.state.name}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.lastNameInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder={'Apellido'}
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({lastName:text})}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.emailInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder={'Email'}
              placeholderTextColor={COLORS.black}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => this.setState({email:text.trim()})}
              value={this.state.email}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.houseInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder={'Número de casa'} 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({houseNumber:text})}
              value={this.state.houseNumber}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.passInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Contraseña"
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({password:text})}
              value={this.state.password}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.confirmInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Confirmar Contraseña"
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({passwordConfirm:text})}
              value={this.state.passwordConfirm}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.phoneInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder={'Número de teléfono'}
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({phoneNumber:text})}
              value={this.state.phoneNumber}
            />
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
            this.state.showLoader
            ? <View style={styles.loaderContainer}>
                <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
                <Text style={styles.saveText}>Guardando información</Text>
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
          <ViewShot style={styles.codeContainer} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
            <QRCode
              value={this.state.residentNum}
              size={200}
              bgColor='black'
              fgColor='white'/>
          </ViewShot>
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
    marginTop: 5
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
  createText: {
    color: COLORS.primary,
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
  scroll: {
    paddingTop: 16
  },
  loaderContainer: {
    alignSelf: 'center',
    marginTop: 16
  },
  saveText: {
    color: COLORS.darkPrimary
  }
});

export default CreateResident;
