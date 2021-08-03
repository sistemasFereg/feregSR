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
import { COLORS } from '../../../assets/styles/variables';
import firebase from '../../../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../components/header';

class CreateManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: [],
      name: '',
      lastName: '',
      managerNum: '',
      email: '',
      phone: '',
      userType: '',
      image: '',
      photoUrl: '',
      password: '',
      passwordConfirm: '',
      error: false,
      errorData: false,
      disable: false,
      showLoader: false
    };
  }

  componentDidMount() {
    // console.log(this.props)
    if(this.props.manager) {
      this.setState({ manager: this.props.manager });
      this.setState({ name: this.props.manager.name });
      this.setState({ lastName: this.props.manager.lastName });
      this.setState({ managerNum: this.props.manager.managerNum });
    }
  }

  validate() {
    const {name, lastName, managerNum, email, phone, password, passwordConfirm} = this.state;
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
    if(managerNum.trim().length == 0){
      this.numInput.setNativeProps({
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
    if(phone.trim().length == 0){
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
    if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        managerNum.trim().length != 0 && 
        email.trim().length != 0 && 
        phone.trim().length != 0 &&
        password.trim().length != 0 &&
        passwordConfirm.trim().length != 0) {

      this.submitSignup();
      this.setState({ errorData: false});
    }
    else {
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
          this.uploadImage(this.state.image);
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
      this.setState({ error: 'Las contraseñas no coinciden.' });
      this.setState({ showLoader: false });
      this.setState({ disable: false });
    }
  }

  createUser() {
    firebase.firestore().collection("user").doc(`${this.state.email}`).set({
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      managerNum: this.state.managerNum,
      userType: 'admin',
      photo: this.state.photoUrl,
    }).then((res) => {
      this.setState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        managerNum: '',
        password: '',
        passwordConfirm: ''
      });
      Alert.alert("Fereg SR","Administrador creado exitosamente");
      this.setState({ error: false});
      this.setState({ showLoader: false });
      this.setState({ disable: false });
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({ error: true});
      this.setState({ showLoader: false });
      this.setState({ disable: false });
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
      this.setState({ image: `data:image/jpg;base64,${result.base64}` });
      // this.setState({ showLoader: true });
      // this.setState({ disable: true });
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
      quality: 0,
    });

    if (!result.cancelled) {
      this.setState({ image: `data:image/jpg;base64,${result.base64}` });
      // this.setState({ showLoader: true });
      // this.setState({ disable: true });
    }
  }

  async uploadImage(image) {
    if(image) {
      const response = await fetch(image);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`users/${this.state.managerNum}`);
      const task = storageRef.put(blob);

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ photoUrl: res });
          this.setState({ disable: false });
          this.setState({ showLoader: false });
          this.createUser();
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
    else {
      this.createUser();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Crear Administrador"}/>
        <ScrollView>
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
              placeholder="Apellidos" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({lastName:text})}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.numInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Número de administrador" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({managerNum:text})}
              value={this.state.managerNum}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.emailInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Email" 
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({email:text})}
              value={this.state.email}
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
              placeholder="Teléfono" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({phone:text})}
              value={this.state.phone}
            />
          </View>
          {
            this.state.error
            ? <Text style={styles.error}>{this.state.error}</Text>
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
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    flex: 1,
    backgroundColor: COLORS.darkGray
  },
  titleContainer: {
    backgroundColor: COLORS.darkPrimary
  },
  title: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold'
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
    alignSelf: 'center',
    marginTop: 16
  },
  loaderContainer: {
    alignSelf: 'center',
    marginTop: 16
  },
  saveText: {
    color: COLORS.darkPrimary
  }
});

export default CreateManager;
