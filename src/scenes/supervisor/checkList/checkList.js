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
  Image
} from 'react-native';
import firebase from '../../../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../../assets/styles/variables';
import CustomHeader from '../../../components/header/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { Card } from 'react-native-shadow-cards';
import * as Permissions from 'expo-permissions';
import moment from 'moment';
import * as ImageManipulator from 'expo-image-manipulator';

const placeholder = {
  label: 'Selecciona al guardia',
  value: null,
  color: '#9EA0A4',
};

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      guard: '',
      guards: [],
      guardNames: [],
      guardList: [],
      superNum:'',
      photo: '',
      photoUrl: '',
      comment: '',
      error: false,
      errorData: false,
      disable: true,
      showLoader: false,
      image: '',
      photoUrl: '',
      disable: false,
    };
  }

  async componentDidMount() {
    this.setState({ showLoader: true });
    const guards = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('guard').get();
      snapshot.forEach((doc) => {
        var guardName = `${doc.data().name} ${doc.data().lastName}`
        guards.push({label: guardName, value: doc.data()});
        if(doc) {
          this.setState({ showLoader: false });
        }
      });
      this.setState({ guardList: guards });
  }

  validate() {
    const {comment} = this.state;
    if(comment.trim().length == 0){
      this.commentInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(comment.trim().length != 0) {
      this.createChecklist();
    }
    else
    {
      this.setState({ errorData: true});
    }
  }

  createChecklist() {
    this.setState({ showCode: true });
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('checkList').doc(`${moment().format('DD-MM-YYYY-HH:mm')}-${this.props.user.superNum}`).set({
      superNum: this.props.user.superNum,
      comment: this.state.comment,
      guardList: this.state.guardNames ? this.state.guardNames : null,
      photo: this.state.photoUrl ? this.state.photoUrl : null,
    }).then((res) => {
      this.setState({
        superNum: '',
        comment: '',
        guardList: [],
        guardNames: '',
        photoUrl: '',
        photo: '',
        guard: ''
      })
      Alert.alert("Fereg SR","Tu checklist ha sido creado");//nuevo
    })
    .catch((err) => {
      console.error("Error found: ", err);
    });
  }

  addGuard() {
    this.state.guards.push(this.state.guard);
    this.setState({ guardNames: this.state.guards })
  }

  async takePicture() {
    await Permissions.askAsync(Permissions.CAMERA);
    try {
      let result = await ImagePicker.launchCameraAsync({
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        this.setState({ photo: result.uri });
        this.uploadImage(result);
        this.setState({ showLoader: true });
        this.setState({ disable: true });
      }
    } catch (E) {
        console.warn(E);
    }
  }

  uploadImage = async(image) => {
    this.setState({ showLoader: true});
    if(image) {
      let manipResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.PNG }
      );
      const response = await fetch(manipResult.uri);
      const blob = await response.blob();
      var storageRef = await firebase.storage().ref(`checklist/${moment().format('DD-MM-YYYY-HH:mm')}-${this.state.superNum}`);
      const task = storageRef.put(blob)

      task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ disable: false });
          this.setState({ photoUrl: res });
          this.setState({ showLoader: false});
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'CheckList'}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.inputView} ref={r=>this.superInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Numero de supervisor" 
              placeholderTextColor={COLORS.black}
              editable={false}
              value = {this.props.user.superNum}
            />
          </View>
          <View style={styles.commentView} ref={r=>this.commentInput=r}>
            <TextInput  
              style={styles.commentText}
              placeholder="Descripcion del entorno (Lim. 150)" 
              placeholderTextColor={COLORS.black}
              multiline = {true}
              numberOfLines = {4}
              maxLength = {150}
              onChangeText={text => this.setState({ comment: text })}
              value = {this.state.comment}
            />
          </View>
          <View>
            <Text style={styles.titleImage}>Imagen de guardias</Text>
            <TouchableOpacity onPress={() => this.takePicture()}>
              <View style={styles.imageContainer}>
                {
                  this.state.photo
                  ? <Image style={styles.image} source={{uri: `${this.state.photo}`}} />
                  : <Ionicons name="camera-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                }
              </View>
            </TouchableOpacity>
          </View>
          <RNPickerSelect
            placeholder={placeholder}
            items={this.state.guardList}
            onValueChange={value => this.setState({ guard: value})}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 25,
                right: '12%',
              },
            }}
            // value={this.state.guard.name}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="gray" />;
            }}
          />
          <TouchableOpacity 
            style={styles.btnAdd}
            onPress={() => this.addGuard()}
          >
            <Text style={styles.createText}>Agregar Guardia</Text>
          </TouchableOpacity>
          {
            this.state.guardNames 
              ? 
                this.state.guardNames.map((guard, i) => (
                  <View key={i}>
                    <Card style={styles.card}>
                      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GuardProfile', { guard: guard })}>
                        <View style={styles.cardContent}>
                          <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                          <View style={styles.cardText}>
                            <View style={styles.info}>
                              <Text style={styles.title}>Guardia: </Text>
                              <Text style={styles.name}>{guard.name} {guard.lastName}</Text>
                            </View>
                            <View style={styles.buttonsContainer}>
                              <TouchableOpacity
                                style={styles.buttonIcon} 
                                onPress={()=>this.showDialog(guard)}
                              >
                                <Ionicons name="md-trash" color={COLORS.accent} size={20} style={styles.icon}/>
                              </TouchableOpacity>
                              
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Card>
                  </View>
              ))
            : null
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
          <TouchableOpacity 
            style={styles.btnCreate}
            onPress={() => this.validate()}
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
    flex: 1,
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
    marginBottom: 80
  },
  btnAdd: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 10,
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
  codeContainer: {
    alignSelf: 'center',
    marginTop: 16
  },
  scroll: {
    paddingTop: 16
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
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
  guardList: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  card: {
    flex: 1,
    width: '95%',
    padding: 10, 
    margin: 10,
    backgroundColor: COLORS.darkGray
  },
  cardContent: {
    flexDirection: 'row',
  },
  icon: {
    color: COLORS.darkPrimary,
    marginTop: 5
  },
  cardText: {
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 5
  },
 title: {
    color: COLORS.darkPrimary,
    marginLeft: 16
  },
  name: {
    marginLeft: 8,
    color: COLORS.white
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginLeft: '80%'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleImage: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "80%",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: COLORS.white,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: "80%",
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: COLORS.white,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default CheckList;
