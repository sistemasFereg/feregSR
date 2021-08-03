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
  ActivityIndicator,
  Animated,
  Easing,
 } from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import firebase from '../../../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../components/header';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImageManipulator from 'expo-image-manipulator';

class CreateGuard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DatePickerVisibility: false,
      guard: [],
      userType: '',
      error: false,
      errorData: false,
      showLoader: false,
      image: '',
      photoUrl: '',
      disable: false,
      //datos colaborador
      name: '',
      lastName: '',
      email: '',
      //phone: '',
      guardNum: '',
      curp: '',
      nss: '',
      rfc: '',
      escolaridad: '',
      antiguedad: '',
      folio: '',
      eCivil: '',
      date: moment().format('HH:mm - DD-MM-YYYY'),
      today: moment().startOf('day'),
      nacimiento: '',
      nacimientoDate: '',
      //domicilio particular
      calle: '',
      colonia: '',
      ciudad: '',
      estado: '',
      numInterior: '',
      postal: '',
      //datos asignacion
      zona: '',
      servicio: '',
      contraDate: '',
      asigDate: '',
      supervi: '',
      turno: '',
      //avaluacion
      prueba: '',
      resultaPrueba: '',
      //capasitacion
      curso: '',
      modulo: '',
      resultados: '',
      //
      initDate: null,
      naciDate: null,
      asigDate: null,
      pruebaDate: null,
      capasiDate: null,
      createDate: null,

    };
  }

  componentDidMount() {
    console.log()
    //this.setState({date: moment().format('DD-MM-YYYY:HH:mm').toString()});
    if(this.props.guard) {
      this.setState({ guard: this.props.guard });
      this.setState({ name: this.props.guard.name });
      this.setState({ lastName: this.props.guard.lastName });
      //this.setState({ place: this.props.guard.place });
      //this.setState({ guardNum: this.props.guard.guardNum});//duda en esta parte

        }      
        
      Animated.timing(new Animated.Value(0), {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();
   
  }

  showDatePicker = (type) => {
    if(type == 'initDate') {
      this.setState({showInitPicker: true});
    }
    else if(type == 'asigDate') {
      this.setState({showAsigPicker: true});
    }
    else if(type == 'naciDate') {
      this.setState({showNaciPicker: true});
    }
    else if(type == 'pruebaDate') {
      this.setState({showPruebaPicker: true});
    }
    else if(type == 'capasiDate') {
      this.setState({showCapasiPicker: true});
    }
  };

  hideDatePicker = () => {
    this.setState({showInitPicker: false});
    this.setState({showAsigPicker: false});
    this.setState({showNaciPicker: false});
    this.setState({showPruebaPicker: false});
    this.setState({showCapasiPicker: false});
  };

  handleConfirm = (date, type) => {
    //console.log(date);
    if(type == 'initDate') {
      this.setState({initDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    else if(type == 'naciDate') {
      this.setState({naciDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    else if(type == 'asigDate') {
      this.setState({asigDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    else if(type == 'pruebaDate') {
      this.setState({pruebaDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    else if(type == 'capasiDate') {
      this.setState({capasiDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    }
    this.hideDatePicker();
  };


  validate() {
    const {name, lastName, email,curp,nss, rfc, folio, escolaridad,eCivil, antiguedad, nacimiento, calle, colonia, ciudad,estado, numInterior,
    postal, zona, servicio,supervi, prueba, resultaPrueba, curso, modulo, resultados, turno } = this.state;
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
    if(curp.trim().length == 0){
      this.curpInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(nss.trim().length == 0){
      this.nssInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(rfc.trim().length == 0){
      this.rfcInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(escolaridad.trim().length == 0){
      this.escolaridadInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(antiguedad.trim().length == 0){
      this.antiguedadInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(folio.trim().length == 0){
      this.folioInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(eCivil.trim().length == 0){
      this.eCivilInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(nacimiento.trim().length == 0){
      this.nacimientoInput.setNativeProps({
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
    if(calle.trim().length == 0){
      this.calleInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(colonia.trim().length == 0){
      this.coloniaInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(ciudad.trim().length == 0){
      this.ciudadInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(estado.trim().length == 0){
      this.estadoInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(numInterior.trim().length == 0){
      this.numInteriorInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(postal.trim().length == 0){
      this.postalInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(zona.trim().length == 0){
      this.zonaInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(servicio.trim().length == 0){
      this.servicioInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(supervi.trim().length == 0){
      this.superviInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(prueba.trim().length == 0){
      this.pruebaInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(resultaPrueba.trim().length == 0){
      this.resultaPruebaInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(curso.trim().length == 0){
      this.cursoInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(modulo.trim().length == 0){
      this.moduloInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(resultados.trim().length == 0){
      this.resultadosInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(turno.trim().length == 0){
      this.turnoInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(this.state.initDate == null){
      this.initRefe.setNativeProps({
      });
    }
   
    if(name.trim().length != 0 && lastName.trim().length != 0 && email.trim().length != 0
     && curp.trim().length != 0 && nss.trim().length != 0 && rfc.trim().length != 0 && folio.trim().length != 0 && escolaridad.trim().length != 0 && antiguedad.trim().length != 0
     && nacimiento.trim().length != 0 && calle.trim().length != 0 && colonia.trim().length != 0 && ciudad.trim().length != 0 && estado.trim().length != 0 && numInterior.trim().length != 0
     && postal.trim().length != 0 && zona.trim().length != 0 && servicio.trim().length != 0 && supervi.trim().length != 0 && prueba.trim().length != 0 && resultaPrueba.trim().length != 0
     && curso.trim().length != 0 && modulo.trim().length != 0 && resultados.trim().length != 0 && eCivil.trim().length != 0 && resultados.trim().length != 0 && turno.trim().length != 0) {
      if(this.state.initDate && this.state.naciDate && this.state.asigDate && this.state.pruebaDate && this.state.capasiDate) {
        this.createUser();
        this.setState({ errorData: false});
      }
      this.setState({ errorData: true});
    }
    else {
      this.setState({ errorData: true});
    }
  }

  createUser() {
    let createDate= moment().format('HH:mm - DD-MM-YYYY');
    firebase.firestore().collection("user").doc(`${this.state.email}`).set({
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      //phone: this.state.phone,
      guardNum: this.state.folio,
      userType: 'guard',
      photo: this.state.photoUrl,
      curp: this.state.curp,
      nss: this.state.nss,
      rfc: this.state.rfc,
      escolaridad: this.state.escolaridad,
      antiguedad: this.state.antiguedad,
      folio: this.state.folio,
      eCivil: this.state.eCivil,
      nacimiento: this.state.nacimiento,
      calle: this.state.calle,
      colonia: this.state.colonia,
      ciudad: this.state.ciudad,
      estado: this.state.estado,
      numInterior: this.state.numInterior,
      postal: this.state.postal,
      zona: this.state.zona,
      servicio: this.state.servicio,
      supervi: this.state.supervi,
      prueba: this.state.prueba,
      resultaPrueba: this.state.resultaPrueba,
      curso: this.state.curso,
      resultados: this.state.resultados,
      turno: this.state.turno,
      initDate: this.state.initDate,
      naciDate: this.state.naciDate,
      asigDate: this.state.asigDate,
      pruebaDate: this.state.pruebaDate,
      capasiDate: this.state.capasiDate,
      createDate: createDate

    }).then((res) => {
      this.setState({
         //datos colaborador
      name: '',
      lastName: '',
      email: '',
      //phone: '',
      guardNum: '',
      curp: '',
      nss: '',
      rfc: '',
      escolaridad: '',
      antiguedad: '',
      folio: '',
      eCivil: '',
      nacimiento: '',
      nacimientoDate: '',
      //domicilio particular
      calle: '',
      colonia: '',
      ciudad: '',
      estado: '',
      numInterior: '',
      postal: '',
      //datos asignacion
      zona: '',
      servicio: '',
      contraDate: '',
      asigDate: '',
      supervi: '',
      turno: '',
      //avaluacion
      prueba: '',
      resultaPrueba: '',
      //capasitacion
      curso: '',
      modulo: '',
      resultados: '',
      });
      Alert.alert("Fereg SR","Guardia creado exitosamente");
      this.setState({ error: false});
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
      this.setState({ showLoader: true });
      this.setState({ disable: true });
      this.uploadImage(result);
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
        }).catch(error => {
          console.log("Error: ", error);
        });
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Crear Guardia'}/>
        <ScrollView style={styles.scroll}>
         <View>
            <Text style={styles.midTitle}>Datos colaborador</Text>
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

                              {/*  Fechaa prueba inicio*/}
            <Text style={styles.dateText} ref={r=>this.initRefe=r}>Fecha de inicio</Text>
             {/* <Text style={styles.dateText}>{this.state.date.toString()}</Text> */}
            <View style={styles.dateContainer }>
                {
                  this.state.initDate
                  ? <Text style={styles.dateText} >{this.state.initDate}</Text>
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
                  // display='inline'
                  format = 'DD-MM-YYYY, HH:mm'
                  onConfirm={(date) => this.handleConfirm(date, 'initDate')}
                  onCancel={() => this.hideDatePicker()}
                />
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
          <View style={styles.inputView} ref={r=>this.curpInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="CURP" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({curp:text})}
              value={this.state.curp}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.nssInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Numero de seguro" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({nss:text})}
              value={this.state.nss}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.rfcInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="RFC" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({rfc:text})}
              value={this.state.rfc}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.folioInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Folio" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({folio:text})}
              value={this.state.folio}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.antiguedadInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Antiguedad" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({antiguedad:text})}
              value={this.state.antiguedad}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.eCivilInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Estado civil" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({eCivil:text})}
              value={this.state.eCivil}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.escolaridadInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Escolaridad" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({escolaridad:text})}
              value={this.state.escolaridad}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.nacimientoInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Lugar de nacimiento" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({nacimiento:text})}
              value={this.state.nacimiento}
            />
          </View>
          <Text style={styles.dateText}>Fecha de nacimiento</Text>
            <View style={styles.dateContainer}>
               {
                  this.state.naciDate
                  ? <Text style={styles.dateText}>{this.state.naciDate}</Text>
                  : <Text style={styles.dateText}>--</Text>
                }
                <TouchableOpacity
                  onPress={() => this.showDatePicker('naciDate')}
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
                  isVisible={this.state.showNaciPicker}
                  mode="date"
                  // display='inline'
                  format = 'DD-MM-YYYY'
                  onConfirm={(date) => this.handleConfirm(date, 'naciDate')}
                  onCancel={() => this.hideDatePicker()}
                />
            </View>
            {
              this.state.showLoader
              ? <View style={styles.loaderContainer}>
                  <ActivityIndicator false size="small" color={COLORS.darkPrimary} />
                  <Text style={styles.saveText}>Guardando imagen</Text>
                </View>
              : null
            }
         </View>
         <View>
           <Text style={styles.midTitle}>Domicilio particular</Text>
           <View style={styles.inputView} ref={r=>this.calleInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Calle" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({calle:text})}
              value={this.state.calle}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.coloniaInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Colonia" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({colonia:text})}
              value={this.state.colonia}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.estadoInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Estado" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({estado:text})}
              value={this.state.estado}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.numInteriorInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Numero interior" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({numInterior:text})}
              value={this.state.numInterior}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.ciudadInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Ciudad" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({ciudad:text})}
              value={this.state.ciudad}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.postalInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Codigo postal" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({postal:text})}
              value={this.state.postal}
            />
          </View>
        
           <View style={styles.inputView} ref={r=>this.zonaInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Zona" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({zona:text})}
              value={this.state.zona}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.servicioInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Servicio" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({servicio:text})}
              value={this.state.servicio}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.superviInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Supervisor" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({supervi:text})}
              value={this.state.supervi}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.turnoInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Turno" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({turno:text})}
              value={this.state.turno}
            />
          </View>

          <Text style={styles.dateText}>Fecha de asignacion</Text>
            <View style={styles.dateContainer}>
               {
                  this.state.asigDate
                  ? <Text style={styles.dateText}>{this.state.asigDate}</Text>
                  : <Text style={styles.dateText}>--</Text>
                }
                <TouchableOpacity
                  onPress={() => this.showDatePicker('asigDate')}
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
                  isVisible={this.state.showAsigPicker}
                  mode="datetime"
                  // display='inline'
                  format = 'DD-MM-YYYY, HH:mm'
                  onConfirm={(date) => this.handleConfirm(date, 'asigDate')}
                  onCancel={() => this.hideDatePicker()}
                />
            </View>
            
         </View>

         <View>
           <Text style={styles.midTitle}>Evaluaciones Psicometriscas, Antidoping, Juridica y Social</Text>
           <Text style={styles.dateText}>Fecha de la prueba</Text>
            <View style={styles.dateContainer}>
                {
                  this.state.pruebaDate
                  ? <Text style={styles.dateText}>{this.state.pruebaDate}</Text>
                  : <Text style={styles.dateText}>--</Text>
                }
                <TouchableOpacity
                  onPress={() => this.showDatePicker('pruebaDate')}
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
                  isVisible={this.state.showPruebaPicker}
                  mode="datetime"
                  // display='inline'
                  format = 'DD-MM-YYYY, HH:mm'
                  onConfirm={(date) => this.handleConfirm(date, 'pruebaDate')}
                  onCancel={() => this.hideDatePicker()}
                />
            </View>
            <View style={styles.inputView} ref={r=>this.pruebaInput=r}>
              <TextInput  
                style={styles.inputText}
                placeholder="Prueba" 
                placeholderTextColor={COLORS.black}
                onChangeText={text => this.setState({prueba:text})}
                value={this.state.prueba}
              />
            </View>
            <View style={styles.inputView} ref={r=>this.resultaPruebaInput=r}>
              <TextInput  
                style={styles.inputText}
                placeholder="Resultados" 
                placeholderTextColor={COLORS.black}
                onChangeText={text => this.setState({resultaPrueba:text})}
                value={this.state.resultaPrueba}
              />
            </View>
         </View>


           <View>
              <Text style={styles.midTitle}>Capasitaciones</Text>
              <Text style={styles.dateText}>Fecha</Text>
                <View style={styles.dateContainer}>
                 {
                  this.state.capasiDate
                  ? <Text style={styles.dateText}>{this.state.capasiDate}</Text>
                  : <Text style={styles.dateText}>--</Text>
                }
                <TouchableOpacity
                  onPress={() => this.showDatePicker('capasiDate')}
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
                  isVisible={this.state.showCapasiPicker}
                  mode="datetime"
                  // display='inline'
                  format = 'DD-MM-YYYY, HH:mm'
                  onConfirm={(date) => this.handleConfirm(date, 'capasiDate')}
                  onCancel={() => this.hideDatePicker()}
                />
                </View>
              <View style={styles.inputView} ref={r=>this.cursoInput=r}>
                <TextInput  
                  style={styles.inputText}
                  placeholder="Curso" 
                  placeholderTextColor={COLORS.black}
                  onChangeText={text => this.setState({curso:text})}
                  value={this.state.curso}
                />
              </View>
               <View style={styles.inputView} ref={r=>this.moduloInput=r}>
              <TextInput  
                style={styles.inputText}
                placeholder="Modulo" 
                placeholderTextColor={COLORS.black}
                onChangeText={text => this.setState({modulo:text})}
                value={this.state.modulo}
              />
              </View>
               <View style={styles.inputView} ref={r=>this.resultadosInput=r}>
              <TextInput  
                style={styles.inputText}
                placeholder="Resultados" 
                placeholderTextColor={COLORS.black}
                onChangeText={text => this.setState({resultados:text})}
                value={this.state.resultados}
              />
              {/* </View> */}
            </View>
          
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
  },
  date: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
     alignSelf: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  optionButtonIcon: {
    width: 42,
    marginHorizontal: 4,
    marginTop: -5
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
  iconDate: {
    marginLeft: 20
  },
  table: {
    width: '100%'
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  rowTitle: {
    backgroundColor: COLORS.darkPrimary,
    width: '33%',
    textAlign: 'center',
    borderColor: COLORS.darkPrimary,
    borderWidth: 1,
    padding: 5,
    color: COLORS.white
  },
  rowText: {
    width: '33%',
    textAlign: 'center',
    borderColor: COLORS.darkPrimary,
    borderWidth: 1,
    padding: 5,
  },
});

export default CreateGuard;
