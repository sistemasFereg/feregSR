import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  Share, 
  ScrollView, 
  Alert 
} from 'react-native';
import SwitchToggle from "react-native-switch-toggle";
import { COLORS } from '../../../assets/styles/variables';
import moment from 'moment';
import firebase from '../../../config/firebase';
import QRCode from 'react-native-qrcode-generator';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
import CustomHeader from '../../../components/header';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationNumber: '',
      name: '',
      lastName: '',
      isCar: false,
      isUso: false,
      plates: '',
      brand: '',
      color: '',
      error: false,
      errorData: '',
      showInitPicker: false,
      showEndPicker: false,
      date: new Date(moment().format('YYYY-MM-DD HH:mm:ss:SSZ')),
      initDate: null,
      endDate: null,
      limitDate: null,
      showCode: false,
      houseNum: '',
      disable: false,
      showLimitPicker: false,
      disable: false,
      isUnique: false,
      isValid: false,
      nowDate: moment().format('DD-MM-YYYY - HH:mm'),
      errorDate: '',
      
    };
  }

  onPress = () => {
    this.setState({ isCar: !this.state.isCar });
  };

  onPressUso = () => {
    this.setState({ isUso: !this.state.isUso });
  };

  validate() {
    const {name, lastName, plates, brand, color, houseNum} = this.state;
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
    if(plates.trim().length == 0 && this.state.isCar){
      this.platesInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(brand.trim().length == 0 && this.state.isCar){
      this.brandInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(color.trim().length == 0 && this.state.isCar){
      this.colorInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(houseNum.trim().length == 0){
      this.houseInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    //auto
    if(!this.state.isCar) {
      if(name.trim().length != 0 && lastName.trim().length != 0 && houseNum.trim().length != 0) {
        this.setState({ errorData: false});
      }
      else{
        this.setState({ errorData: true});
      }
    }
    if(this.state.isCar) {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        plates.trim().length != 0 &&
        brand.trim().length != 0 &&
        color.trim().length != 0 &&
        houseNum.trim().length != 0) {
        this.setState({ errorData: false});
      }
      else {
        this.setState({ errorData: true});
      }
    }
     //tipo de invitacion
     if(this.state.isUso) {
      if(this.state.initDate >= this.state.nowDate) {
        console.log('uno fin');
        this.setState({ isUnique: true});
        this.setState({errorDate: ''});
        this.createInvitation();
      }
      else{
        this.setState({errorDate: 'Fecha de acceso invalida'});
       // Alert.alert("Hora y Fecha","ingrese fecha de inicio");
      }
    }
    if(!this.state.isUso) {
      //validar fecha inicio menor a fecha fin
      if(this.state.initDate >= this.state.nowDate ){
        if(this.state.initDate < this.state.endDate ){
        console.log('dos fin');
        this.setState({errorDate: ''});
        this.setState({ isValid: true});
        this.createInvitation();
        }
        else{
          this.setState({errorDate: 'Fecha de expiracion invalida'});
        //Alert.alert("Hora y Fecha","Revise que la hora final sea despues de la inicial");  
        }
     }
     else{
      this.setState({errorDate: 'Fecha inicio invalida'});
     }
    }
   
  }

  createInvitation() {
    console.log('empezo el create')
    this.setState({ disable: true });
    var invitationId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i <= 10; i++) {
      invitationId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ invitationNumber: invitationId });
     console.log(this.state.invitationNumber);
    this.refs.viewShot.capture().then(uri => {
     this.uploadImage(uri, invitationId); 
      //console.log(invitationId);
      console.log(uri);
      this.setState({ disable: false });
    })
    .catch(error => {
      console.log(error,'aqui'); 
      this.setState({ disable: false });
    });
  }

  uploadImage = async(imageUri, invitationId) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    var storageRef = await firebase.storage().ref(`residents/${invitationId}`);
    const task = storageRef.put(blob)

    task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          this.setState({ qrCodeUrl: res })
          firebase.firestore().collection("condominium").doc(`${this.props.condominium.name}`).collection('invitation').doc(`${invitationId}`).set({
            invitationNum: this.state.invitationNumber,
            name: this.state.name,
            lastName: this.state.lastName,
            brand: this.state.brand,
            houseNum: this.state.houseNum,
            qrCode: res,
            color: this.state.color,
            plates: this.state.plates,
            initDate: this.state.initDate,
            endDate: this.state.endDate,
            //limitDate: this.state.limitDate,
            isEntry: true,
          }).then(() => {
            firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('qrCode').doc().set({
              invitationNum: this.state.invitationNumber,
              qrCode: res,
              codeNum: this.state.invitationNumber,
              houseNum: this.state.houseNum,
              initDate: this.state.initDate,
              //limitDate: this.state.limitDate,
              endDate: this.state.endDate,
              userType: 'invitation',
              isUnique: this.state.isUnique,
              isValid: this.state.isValid
            }).then(() => {
              this.setState({ disable: false });
              // this.setState({
              //   name: '',
              //   lastName: '',
              //   brand: '',
              //   houseNum:'',
              //   color: '',
              //   plates: '',
              //   initDate: '',
              //   endDate: '',
              //   limitDate:'' 
              // });  
              Alert.alert("Fereg SR","Tu invitado ha sido registrado, ahora comparte su código con el.");  
            })
            .catch((err) => {
              console.error("Error found: ", err);
            });
            // this.setState({
            //   name: '',
            //   lastName: '',
            //   brand: '',
            //   houseNum:'',
            //   color: '',
            //   plates: '',
            //   initDate: '',
            //   endDate: '',
            //   limitDate:'' 
            // });  
            
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
    if(this.state.qrCodeUrl) {
      let options = {
        title: 'Compartir código',
        message: 'Por favor descarga tu código QR, del siguiente enlace: ',
        url: this.state.qrCodeUrl,
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

  showDatePicker = (type) => {
    if(type == 'initDate') {
      this.setState({showInitPicker: true});
    }
    else if(type == 'limitDate') {
      this.setState({showLimitPicker: true});
    }
    else if(type == 'endDate') {
      this.setState({showEndPicker: true});
    }
    
  };

  hideDatePicker = () => {
    this.setState({showInitPicker: false});
    this.setState({showLimitPicker: false});
    this.setState({showEndPicker: false});
  };

  handleConfirm = (date, type) => {
    //console.log(date);
    if(type == 'initDate') {
      this.setState({initDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    else if(type == 'limitDate') {
      this.setState({limitDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    else if(type == 'endDate') {
      this.setState({endDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    this.hideDatePicker();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Crear Invitacion'}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.inputView} ref={r=>this.nameInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Nombre" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({name:text})}
              value = {this.state.name}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.lastNameInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Apellido" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({lastName:text})}
              value = {this.state.lastName}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.houseInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Número de casa" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({houseNum:text})}
              value = {this.state.houseNum}
            />
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
                <View style={styles.inputView} ref={r=>this.platesInput=r}>
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Placas" 
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => this.setState({plates:text})}
                    value = {this.state.plates}
                  />
                </View>
                <View style={styles.inputView} ref={r=>this.brandInput=r}>
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Marca" 
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => this.setState({brand:text})}
                    value = {this.state.brand}
                  />
                </View>
                <View style={styles.inputView} ref={r=>this.colorInput=r}>
                  <TextInput  
                    style={styles.inputText}
                    placeholder="Color" 
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => this.setState({color:text})}
                    value = {this.state.color}
                  />
                </View>
              </View>
            : null
          }

          {/* Init date */}
          <Text style={styles.midTitle}>Tipo de acceso</Text>
          <View style={styles.switch}>
            <Text style={styles.car}>Invitacion: </Text>
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
              switchOn={this.state.isUso}
              onPress={this.onPressUso}
              circleColorOff={COLORS.accent}
              circleColorOn={COLORS.darkPrimary}
              duration={500}
            />
          </View>
          {
            this.state.isUso//inicio de tipo de ingreso
            ?<View>
              <Text style={styles.dateText}>Pase de un solo uso</Text>
              <Text style={styles.date}>Fecha de inicio</Text>
              <View style={styles.dateContainer}>
                {
                  this.state.initDate
                  ? <Text style={styles.dateText}>{this.state.initDate}</Text>
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

            </View>
            //segunda opcion de switch
            :<View>
              <Text style={styles.dateText}>Pase de multiples-usos</Text>
              <Text style={styles.date}>Fecha de inicio</Text>
              <View style={styles.dateContainer}>
                  {
                    this.state.initDate
                    ? <Text style={styles.dateText}>{this.state.initDate}</Text>
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
                   {/* End date */}
                <Text style={styles.date}>Fecha de expiración</Text>
                <View style={styles.dateContainer}>
                  {
                    this.state.endDate
                    ? <Text style={styles.dateText}>{this.state.endDate}</Text>
                    : <Text style={styles.dateText}>--</Text>
                  }
                  <TouchableOpacity
                    onPress={() => this.showDatePicker('endDate')}
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
                    isVisible={this.state.showEndPicker}
                    confirmTextIOS='Confirmar'
                    mode="datetime"
                    //display='inline'
                    format = 'DD-MM-YYYY, HH:mm'
                    onConfirm={(date) => this.handleConfirm(date, 'endDate')}
                    onCancel={() => this.hideDatePicker()}
                  />
                </View>
             </View>
          }
          {
            this.state.errorDate
              ? <Text style={styles.error}>{`${this.state.errorDate}`}</Text>
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
            disabled={this.state.disable}
          >
            <Text style={styles.createText}>Crear</Text>
          </TouchableOpacity>
          <ViewShot style={styles.codeContainer} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
            <TouchableOpacity style={styles.code} onPress={() => this.openShareScreen()}>
              <QRCode
                value={this.state.invitationNumber}
                size={200}
                bgColor='black'
                fgColor='white'/>
            </TouchableOpacity>
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
    flex: 1,
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
    marginBottom: 10
  },
  createText: {
    color: COLORS.primary,
  },
  icon: {
    marginLeft: 20,
  },
  date: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 6,
    color: COLORS.white
  },
  dateText: {
    textAlign: 'center',
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
  scroll: {
    paddingTop: 16,
  },
  midTitle: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    backgroundColor: COLORS.darkPrimary,
  },
});

export default Invitation;
