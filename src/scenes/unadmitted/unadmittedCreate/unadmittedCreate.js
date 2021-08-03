import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Easing, 
  ScrollView, 
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import firebase from '../../../config/firebase';
import CustomHeader from '../../../components/header';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImageManipulator from 'expo-image-manipulator';

class UnadmittedCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unadmitted: [],
      name: '',
      comment: '',
      error: false,
      errorData: false,
      showLoader: false,
      image: '',
      photoUrl: '',
      disable: false,
      unadmittedId: ''
    };
  }

  componentDidMount() {
    var unadmittedId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      unadmittedId += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.setState({unadmittedId: unadmittedId});

    if(this.props.unadmitted) {
      this.setState({ unadmitted: this.props.unadmitted.data });
      this.setState({ name: this.props.unadmitted.data.name });
      this.setState({ comment: this.props.unadmitted.data.comment });
    }

    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }

  validate() {
    const {name, comment} = this.state;
    if(name.trim().length == 0){
      this.nameInput.setNativeProps({
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
    if(name.trim().length != 0 && comment.trim().length != 0) {
      this.createUnadmitted();
    }
    else{
      this.setState({errorData: true});
    }
  }

  createUnadmitted() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('unadmitted').doc(`${this.state.unadmittedId}`).set({
      name: this.state.name,
      comment: this.state.comment,
      photo: this.state.photoUrl,
      unadmittedId: this.state.unadmittedId
    }).then((res) => {
      Alert.alert("Fereg SR","Persona no admitida agregada");
      this.setState({
        name: '',
        comment: '',
        photo: ''
      })
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({error: true});
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
      this.setState({ showLoader: true });
      this.setState({ disable: true });
      this.uploadImage(`data:image/jpg;base64,${result.base64}`);
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
      this.setState({ showLoader: true });
      this.setState({ disable: true });
      this.uploadImage(result);
    }
  }

  async uploadImage(image) {
    if(image) {
      let manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
      );
      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`users/${this.state.unadmittedId}`);
      const task = storageRef.put(blob);

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ photoUrl: res });
          this.setState({ disable: false });
          this.setState({ showLoader: false });
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Crear persona no admitida'}/>
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
          <View style={styles.inputView} ref={r=>this.titleInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Nombre Completo" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
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
          {
            this.state.error
              ? <Text style={styles.error}>Ingresa la fecha de Inicio/Fin</Text>
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
                <Text style={styles.saveText}>Guardando imagen</Text>
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
  date: {
    flexDirection: 'row',
    
  },
  dateText: {
    width: '50%',
    marginTop: 12
  },
  optionButtonIcon: {
    width: '50%',
    marginLeft: '15%'
  },
  loaderContainer: {
    alignSelf: 'center',
    marginTop: 16
  },
  saveText: {
    color: COLORS.darkPrimary
  }
});

export default UnadmittedCreate;
