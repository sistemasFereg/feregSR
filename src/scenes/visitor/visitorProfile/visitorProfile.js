import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Share,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import { COLORS } from '../../../assets/styles/variables';
import moment from 'moment';
import * as FileSystem from 'expo-file-system';
import CustomHeader from '../../../components/header';
import firebase from '../../../config/firebase';

class VisitorProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visitor: this.props.visitor,
      isCar: false,
      outDate: null,
      errorData: false,
      error: false,
      disable: false,
      nameNew: '',
    };
  }
componentDidMount(){
  console.log(this.props);
}
  async openShareScreen() {
    if(this.state.visitor.qrCode) {
      let options = {
        title: 'Share Title',
        message: 'Por favor descarga tu código QR, del siguiente enlace: ',
        url: this.state.visitor.qrCode,
        type: 'image/jpeg',
      };
      Share.share(options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    }
  }

  onPress = () => {
    this.setState({ isCar: !this.state.isCar });
  };
//falta validar
validate() {
  const {nameNew} = this.state;

  if (!this.state.isCar) {//
   this.EndDate();

    }
    else{
      if(nameNew.trim().length == 0){
        this.nameInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
      this.setState({ errorData: true});
      }
      else{
        this.EndDate();
      }
    }
 
  }

  async EndDate() {
    this.setState({disable: true});
    let outDate= moment().format('HH:mm - DD-MM-YYYY');
    this.setState({ outDate: outDate});
    await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('visitor').doc(this.props.visitor.visitorId).update({
        nameNew: this.state.nameNew,
        outDate: outDate
      }).then((res) => {
        Alert.alert("Fereg SR", "Salida Registrada");
        this.setState({ error: false});
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({ error: true});
         this.setState({disable: false});
      }); 
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={`${this.state.visitor.name} ${this.state.visitor.lastName}`}/>
        <ScrollView>
        <View style={styles.playerInfo}>
          <View style={styles.dataContainer}>
            <Text style={styles.dataText}>Casa: </Text>
            <Text style={styles.dataInfo}>{this.state.visitor.destination}</Text>
          </View>
          <View style={styles.divider}/>
        </View>
        <Text style={styles.titulo}>Credencial</Text>
          <View style={styles.imageFrame}>
           <Image
              style={styles.image}
              source={{uri: `${this.props.visitor.photoCredential}`}}
            />
          </View>
          {
            this.props.visitor.photoFront
            ? <View>
              <View style={styles.divider}/>
            <Text style={styles.titulo}>Placa  Delantera</Text>
            <View style={styles.imageFrame}>
             <Image
                style={styles.image}
                source={{uri: this.props.visitor.photoFront}}
              />
            </View>
            </View>
            :null
          }
              {
            this.props.visitor.photoBack
            ? <View>
              <View style={styles.divider}/>
            <Text style={styles.titulo}>Placa  Delantera</Text>
            <View style={styles.imageFrame}>
             <Image
                style={styles.image}
                source={{uri: this.props.visitor.photoBack}}
              />
            </View>
            </View>
            :null
          }
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
         <Text style={styles.titulo}>Hora de Ingreso</Text>
           {
              this.state.visitor.createDate
              ? <Text style={styles.dateText}>{this.state.visitor.createDate}</Text>
              : <Text style={styles.dateText}>--</Text>
            }
             <Text style={styles.titulo}>Hora de Salida</Text>
            {
              this.state.outDate
              ? <Text style={styles.dateText}>{this.state.outDate}</Text>
              : <Text style={styles.dateText}>--</Text>
            }
        
        <Text style={styles.titulo}>Persona que extrae vehiculo</Text>
        <View style={styles.switch}>
            <Text style={styles.car}>Propietario SI/NO: </Text>
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
            ?<View style={styles.inputView} ref={r=>this.nameNewInput=r}>
              <TextInput  
                style={styles.inputText}
                placeholder="Nombre" 
                placeholderTextColor={COLORS.black}
                onChangeText={text => this.setState({nameNew: text})}
              />
            </View>
            
            :null
          }
        <TouchableOpacity 
            style={styles.btnCreate}
            onPress={() => this.validate()}
            disabled={this.state.disable}
          >
            <Text style={styles.createText}>Marcar salida</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
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
  dataText: {
    color: COLORS.darkPrimary,
    fontSize: 16
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
  image: {
    height: 180,
    width: 280,
    marginRight: 10
  },
  codeContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 16
  },
  titulo: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: COLORS.white,
    fontSize: 16,
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
  dateText: {
    fontWeight: 'bold',
    color: COLORS.primary,
    alignSelf: 'center'
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
    color: COLORS.black,
    marginTop: 1
  },
  error: {
    textAlign: 'center',
    color: COLORS.error,
    marginTop: 8
  },
});


export default VisitorProfile;