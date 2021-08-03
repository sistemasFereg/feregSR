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
  Image ,
  ActivityIndicator
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import firebase from '../../../config/firebase';
import CustomHeader from '../../../components/header';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import * as ImageManipulator from 'expo-image-manipulator';

class IncidentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incident: [],
      title: '',
      comment: '',
      error: false,
      errorData: false,
      showLoader: false,
      image: '',
      photoUrl: '',
      disable: false,
      hasCameraPermission: null,
      showLoader: false,
      initDate: null,
      incidentNumber: '',
      createDate: null,
      pruebaDate: moment().format('YYYY'),
      compa: moment().format('DD-MM-YYYY - HH:mm'),
      errorDate: false,
    };
  }

  componentDidMount() {
    var invitationId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i <= 10; i++) {
      invitationId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ incidentNumber: invitationId });

    if(this.props.incident) {
      this.setState({ incident: this.props.incident.data });
      this.setState({ title: this.props.incident.title });
      this.setState({ date: this.props.incident.date });
      this.setState({ comment: this.props.incident.comment });
    }

    Animated.timing(new Animated.Value(0), {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }

  validate() {
    const {title, date, comment} = this.state;
    if(title.trim().length == 0){
      this.titleInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(this.state.pruebaDate < this.state.initDate){
      this.setState({ errorDate: true});
    } 
    // if(date.trim().length == 0){
    //   this.dateInput.setNativeProps({
    //     borderColor: COLORS.accent,
    //     borderWidth:1
    //   });
    // }
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

  createIncident() {
    let createDate= moment().format('DD-MM-YYYY - HH:mm');
    this.setState({ showLoader: false });
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('incident').doc(`${this.state.incidentNumber}`).set({
      title: this.state.title,
      date: this.state.initDate,
      comment: this.state.comment,
      incidentNumber: this.state.incidentNumber,
      image: this.state.image,
      createDate: createDate
    }).then((res) => {
      this.setState({
      title: '',
      initDate: null,
      comment: '',
      image: ''
      });
      Alert.alert("Fereg SR","Incidente creado exitosamente");//alerta
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
      this.setState({ image: `data:image/jpg;base64,${result.base64}` });
      this.uploadImage(result);
      this.setState({ showLoader: true });
      this.setState({ disable: true });
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
        this.setState({ image: result.uri });
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
          this.setState({ image: res });
          this.setState({ disable: false });
          this.setState({ showLoader: false});
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  showDatePicker = (type) => {
    if(type == 'initDate') {
      this.setState({showInitPicker: true});
    }
  };

  hideDatePicker = () => {
    this.setState({showInitPicker: false});
  };

  handleConfirm = (date, type) => {
    //console.log(date);
    if(type == 'initDate') {
      this.setState({initDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    this.hideDatePicker();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Crear Incidencia"}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.inputView} ref={r=>this.titleInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Título" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({ title: text })}
              value={this.state.title}
            />
          </View>
          <Text style={styles.date}>Fecha de inicio</Text>
          <View style={styles.dateContainer}>
            {
              this.state.initDate
              ? <Text style={styles.dateText}>{this.state.initDate}</Text>//pruebaDate
              : <Text style={styles.dateText}>--</Text>
            }
            <TouchableOpacity
              onPress={() => this.showDatePicker('initDate')}
              style={styles.icon}
            >
              <AntDesign
              name="calendar"
              size={24}
              color={COLORS.white}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              date = {new Date()}
              isDarkModeEnabled={true}
              confirmTextIOS='Confirmar'
              isVisible={this.state.showInitPicker}
              mode="datetime"
              format = 'DD-MM-YYYY, HH:mm'
              onConfirm={(date) => this.handleConfirm(date, 'initDate')}
              onCancel={() => this.hideDatePicker()}
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
                  ? <Image style={styles.image} source={{uri: `${this.state.image}`}} />//modifique esta parte de fotos
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
            this.state.errorDate
            ? <Text style={styles.error}>Por favor ingresar fecha</Text>
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
    marginBottom: 30
  },
  createText: {
    color: COLORS.primary,
  // },
  // optionButtonIcon: {
  //   width: 42,
  //   marginHorizontal: 4,
  //   marginTop: -5
  },
  error: {
    textAlign: 'center',
    color: COLORS.error,
    marginTop: 8
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
     alignSelf: 'center',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10
  },
  optionButtonIcon: {
    width: '50%',
    marginLeft: '15%'
  },
  icon: {
    marginLeft: 20,
  },
  scroll:{
    paddingTop: 16,
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
});

export default IncidentCreate;
