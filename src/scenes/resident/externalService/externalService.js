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
import SwitchToggle from "react-native-switch-toggle";
import { COLORS } from '../../../assets/styles/variables';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import CustomHeader from '../../../components/header';
import ViewShot from "react-native-view-shot";
import firebase from '../../../config/firebase';
import QRCode from 'react-native-qrcode-generator';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class ExternalService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      type: '',
      houseNum: '',
      isCar: false,
      plates: '',
      brand: '',
      color: '',
      error: false,
      showInitPicker: false,
      showEndPicker: false,
      showEndPicker: false,
      initDate: null,
      endDate: null,
      limitDate: null,
      showCode: false,
      serviceNum: '',
      createDate: null,
      nowDate: moment().format('DD-MM-YYYY - HH:mm'),
      errorDate:''
    };
  }

  componentDidMount() {
    var serviceId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
      serviceId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ serviceNumber: serviceId })
    if(this.props.externalService){
      this.setState({ externalService: this.props.externalService });
      this.setState({ name: this.props.externalService.name });
      this.setState({ lastName: this.props.externalService.lastName });
      this.setState({ houseNum: this.props.externalService.houseNum });
      this.setState({ type: this.props.externalService.type });
      this.setState({ plates: this.props.externalService.plates });
      this.setState({ brand: this.props.externalService.brand });
      this.setState({ initDate: this.props.externalService.initDate });
      this.setState({ endDate: this.props.externalService.endDate });
      this.setState({ limitDate: this.props.externalService.limitDate });
    }
  }

  onPress = () => {
    this.setState({ isCar: !this.state.isCar });
  };

  validate() {
    const {name, lastName, type, plates, brand, color, houseNum} = this.state;
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
    if(type.trim().length == 0){
      this.typeInput.setNativeProps({
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
    if(!this.state.isCar) {
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        type.trim().length != 0 && 
        houseNum.trim().length != 0) {
          this.validateDate();
      }
      else{
        this.setState({error: true});
      }
    }
    if(this.state.isCar) {
      console.log('Got car')
      if(name.trim().length != 0 && 
        lastName.trim().length != 0 && 
        type.trim().length != 0 &&
        plates.trim().length != 0 &&
        brand.trim().length != 0 &&
        color.trim().length != 0 &&
        houseNum.trim().length != 0) {
          this.validateDate();
      }
      else{
        this.setState({error: true});
      }
    }
  }

  validateDate() {
    if(this.state.initDate > this.state.nowDate){// 1 si fecha ini no debe ser anterior a la actual
      this.setState({errorDate: false});
      if(this.state.initDate < this.state.endDate){// 2 si fecha ini no debe ser anterior a la actual
        this.setState({errorDate: false});
        if(this.state.endDate > this.state.nowDate){//3
          this.setState({errorDate: false});
          if(this.state.initDate < this.state.limitDate && this.state.endDate > this.state.limitDate){//4
            this.createExternalService();
            
          }
          else{//cuarto
            this.setState({errorDate: 'Fecha limite entre fecha inicio y expiracion'});
           // Alert.alert("Fereg SR","Fecha limite ente fecha ini y final"); 
          }
        }
        else{// tercer if
          this.setState({errorDate: 'Fecha expiracion de acceso invalida'});
          //Alert.alert("Fereg SR","Fecha final pasada"); 
        }
      }
      else{//segundo if
        this.setState({errorDate: 'Fecha expiracion de acceso invalida'});
       // Alert.alert("Fereg SR","Fecha inicial alta"); 
      }
    }
    else{// primer if
      this.setState({errorDate: 'Fecha inicial invalida, mayor que hora actual'});
      //Alert.alert("Fereg SR","Fecha inicia pasada"); 
    }
  }
  
  createExternalService() {
    this.setState({ disable: true });
    this.refs.viewShot.capture().then(uri => {
      this.uploadImage(uri); 
      //console.log(invitationId);
      this.setState({ disable: false });
    })
    .catch(error => {
      console.log(error);
      this.setState({ disable: false });
    });
  }

  uploadImage = async(imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    var storageRef = await firebase.storage().ref(`externalService/${this.state.serviceNumber}`);
    const task = storageRef.put(blob)

    task.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error.message)
      }, () => {
        storageRef.getDownloadURL().then(res => {
          let createDate= moment().format('DD-MM-YYYY - HH:mm');
          firebase.firestore().collection("condominium").doc(`${this.props.condominium.name}`).collection('service').doc(`${this.state.serviceNumber}`).set({
            name: this.state.name,
            lastName: this.state.lastName,
            brand: this.state.brand,
            serviceNum: this.state.serviceNumber,
            qrCode: res,
            color: this.state.color,
            plates: this.state.plates,
            initDate: this.state.initDate,
            endDate: this.state.endDate,
            limitDate: this.state.limitDate,
            isEntry: true,
            type: this.state.type,
            houseNum: this.state.houseNum,
            createDate: createDate
          }).then(() => {
            firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('qrCode').doc().set({
              serviceNum: this.state.serviceNumber,
              qrCode: res,
              codeNum: this.state.serviceNumber,
              houseNum: this.state.houseNum,
              initDate: this.state.initDate,
              limitDate: this.state.limitDate,
              endDate: this.state.endDate,
              userType: 'service',
              type: this.state.type,
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
              houseNum:'',
              houseNum: '',
              color: '',
              plates: '',
              initDate: '',
              endDate: '',
              limitDate:'' 
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
    if(this.state.serviceNum || this.state.service.serviceNum) {
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
        <CustomHeader title={'Crear Servicio'}/>
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
          <View style={styles.inputView} ref={r=>this.typeInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Tipo" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({type:text})}
              value={this.state.type}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.houseInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Número de casa" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({houseNum:text})}
              value={this.state.houseNum}
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
          {/* Init date */}
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
              format = 'DD-MM-YYYY, HH:mm'
              onConfirm={(date) => this.handleConfirm(date, 'endDate')}
              onCancel={() => this.hideDatePicker()}
            />
          </View>
          {/* Limit date */}
          <Text style={styles.date}>Fecha limite de ingreso</Text>
          <View style={styles.dateContainer}>
            {
              this.state.limitDate
              ? <Text style={styles.dateText}>{this.state.limitDate}</Text>
              : <Text style={styles.dateText}>--</Text>
            }
            <TouchableOpacity
              onPress={() => this.showDatePicker('limitDate')}
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
              isVisible={this.state.showLimitPicker}
              confirmTextIOS='Confirmar'
              mode="datetime"
              format = 'DD-MM-YYYY, HH:mm'
              onConfirm={(date) => this.handleConfirm(date, 'limitDate')}
              onCancel={() => this.hideDatePicker()}
            />
          </View>
          {
            this.state.error
              ? <Text style={styles.error}>Ingresa la información</Text>
              : null
          }
            {
            this.state.errorDate
              ? <Text style={styles.error}>{`${this.state.errorDate}`}</Text>
              : null
          }
          {/* <Text>final de información</Text> */}
          <TouchableOpacity 
            style={styles.btnCreate}
            onPress={() => this.validate()}
            disabled={this.state.disable}
          >
            <Text style={styles.createText}>Crear</Text>
          </TouchableOpacity>
          <ViewShot style={styles.codeContainer} ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
            <QRCode
              value={this.state.serviceNumber}
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
    backgroundColor: COLORS.darkGray,
    flex: 1
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
    marginBottom: 10
  },
  icon: {
    marginLeft: 20
  },
  date: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 6,
    color: COLORS.white
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
  },
});

export default ExternalService;
