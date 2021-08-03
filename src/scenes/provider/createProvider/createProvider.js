import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert
 } from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import firebase from '../../../config/firebase';
import QRCode from 'react-native-qrcode-generator';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import CustomHeader from '../../../components/header';
import * as ImageManipulator from 'expo-image-manipulator';

class CreateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: [],
      name: '',
      lastName: '',
      brand: '',
      providerNumber: '',
      qrCode: '',
      error: false,
      errorData: false
    };
  }

  componentDidMount() {
    if(this.props.provider) {
      this.setState({ provider: this.props.provider });
      this.setState({ name: this.props.provider.name });
      this.setState({ lastName: this.props.provider.lastName });
      this.setState({ brand: this.props.provider.brand });
      this.setState({ providerNumber: this.props.provider.providerNumber });
    }
  }

  validate() {
    const {name, lastName, brand, providerNumber} = this.state;
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
    if(brand.trim().length == 0){
      this.brandInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(providerNumber.trim().length == 0){
      this.providerNumberInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(name.trim().length != 0 && lastName.trim().length != 0 && brand.trim().length != 0 && providerNumber.trim().length != 0) {
      this.createProvider();
    }
    else
    {
      this.setState({ errorData: true});
    }
  }

  createProvider() {
    this.refs.viewShot.capture().then(uri => {
      this.uploadImage(uri); 
    })
    .catch(error => console.log(error));
  }

  uploadImage = async(image) => {
    const response = await fetch(image);
    const blob = await response.blob();
    var storageRef = await firebase.storage().ref(`QRCodes/${this.state.providerNumber}`);
    const task = storageRef.put(blob)

    task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          firebase.firestore().collection("condominium").doc(`${this.props.condominium.name}`).collection('provider').doc(`${this.state.providerNumber}`).set({
            name: this.state.name,
            lastName: this.state.lastName,
            brand: this.state.brand,
            providerNumber: this.state.providerNumber,
            qrCode: res
          }).then(() => {
            firebase.firestore().collection("condominium").doc(`${this.props.condominium.name}`).collection('qrCode').doc().set({
              providerNum: this.state.providerNumber,
              qrCode: res,
              codeNum: this.state.providerNumber,
              // houseNum: this.state.houseNum,
              userType: 'provider',
            }).then(() => {
              this.setState({ disable: false });

            })
            .catch((err) => {
              console.error("Error found: ", err);
            });
            this.setState({
              name: '',
              lastName: '',
              brand: '',
              providerNumber:'',
            });  
            Alert.alert("Fereg SR","Proveedor registrado");  
            this.setState({ error: false}); 
          })
          .catch((err) => {
            console.error("Error found: ", err);
          });
        })
        .catch(error => {
          console.log(error)
          this.setState({ error: true});
        });   
      })
  }

  async openShareScreen() {
    if(this.state.providerNumber || this.state.provider.providerNumber) {
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Crear Proveedor'}/>
        <ScrollView style={styles.scroll}>
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
          <View style={styles.inputView} ref={r=>this.brandInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Marca" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({brand:text})}
              value={this.state.brand}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.providerNumberInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Número de proveedor" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({providerNumber:text})}
              value={this.state.providerNumber}
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
          <TouchableOpacity 
            style={styles.btnCreate}
            onPress={() => this.validate()}
          >
            <Text style={styles.createText}>Crear</Text>
          </TouchableOpacity>
          <ViewShot style={styles.codeContainer} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
            <QRCode
              value={this.state.providerNumber}
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
  }
});

export default CreateProvider;
