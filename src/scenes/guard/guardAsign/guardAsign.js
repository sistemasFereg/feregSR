import React, { Component } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  View,
  Alert,
  TextInput
 } from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import firebase from '../../../config/firebase';
import CustomHeader from '../../../components/header'
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { Card } from 'react-native-shadow-cards';

const placeholder = {
  label: 'Selecciona al guardia',
  value: null,
  color: '#9EA0A4',
};

class AsignGuard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guardList: [],
      guards: [],
      guardsName: [],
      asignedGuards: [],
      guard: '',
      guardDelete: '',
      place: '',
      email: '',
      password: '',
      passwordConfirm: '',
      showLoader: false,
      error: false,
      errorData: false,
      errorEmpty: false
    };
  }

  async componentDidMount() {
    this.setState({ showLoader: true });
    const guards = [];
    var snapshot = await firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('guard').get();
      snapshot.forEach((doc) => {
        guards.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        }
      });
      this.setState({ asignedGuards: guards });

    const guardsArray = [];
    const namesArray = [];
    var snapshot = await firebase.firestore().collection("user").where('userType', '==', 'guard').get();
      snapshot.forEach((doc) => {
        guardsArray.push(doc.data());
        if(doc) {
          this.setState({ showLoader: false });
        }
        var guardName = `${doc.data().name} ${doc.data().lastName}`
        namesArray.push({label: guardName, value: doc.data()});
      });
      if(guardsArray.length == 0) {
        this.setState({errorData: true})
      } else {
        this.setState({ guardList: guardsArray });
        this.setState({ guardsName: namesArray });
      }
  }

  validate() {
    const { place, email, password, passwordConfirm } = this.state;
    if(place.trim().length == 0){
      this.placeInput.setNativeProps({
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
    
    if( place.trim().length != 0 &&
        email.trim().length != 0 &&
        password.trim().length != 0 && 
        passwordConfirm.trim().length != 0) {
      this.submitSignup();
      this.setState({ errorData: false});
    }
    else {
      this.setState({ errorEmpty: true});
    }
  }

  submitSignup() {
    if(this.state.password == this.state.passwordConfirm){
      firebase.auth().setPersistence('none');
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.asignGuard();
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
          console.log(error);
        });
    }
    else {
      this.setState({ error: 'Las contraseñas no coinciden.' })
    }
  }

  asignGuard() {
    this.state.asignedGuards.push(this.state.guard)
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('guard').doc(`${this.state.guard.guardNum}`).set({
      name: this.state.guard.name,
      lastName: this.state.guard.lastName,
      place: this.state.place,
      guardNum: this.state.guard.guardNum,
      photo: this.state.guard.photo ? this.state.guard.photo : null,
      condominium: this.props.route.params.condominium.name
    }).then((res) => {
      Alert.alert("Fereg SR","Guardia asignado exitosamente");
      firebase.firestore().collection("user").doc(`${this.state.guard.email}`).update({
        condominium: this.props.route.params.condominium.name,
      }).then((res) => {
        this.setState({
          place: '',
          email: '',
          password: '',
          passwordConfirm: ''
        })
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
      this.setState({ error: false});
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({ error: true});
    });
  }

  showDialog (guard) {
    this.setState({ showDialog: true });
    this.setState({ guardDelete: guard.guardNum });
  };

  handleCancel ()  {
    this.setState({showDialog: false})
  };

  handleDelete ()  {
    this.deleteGuard()
  };

  deleteGuard() {
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection('guard').doc(this.state.guardDelete).delete()
      .then((res) => {
        this.componentDidMount();
        this.setState({showDialog:false})
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Asignar Guardia'}/>
        <RNPickerSelect
          placeholder={placeholder}
          items={this.state.guardsName}
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
        <View style={styles.inputView} ref={r=>this.placeInput=r}>
          <TextInput  
            style={styles.inputText}
            placeholder="Puesto" 
            placeholderTextColor={COLORS.black}
            onChangeText={text => this.setState({place:text})}
            value={this.state.place}
          />
        </View>
        <View style={styles.inputView} ref={r=>this.emailInput=r}>
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={COLORS.black}
            onChangeText={text => this.setState({email:text.trim()})}
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
        <ScrollView style={styles.scroll}>
          {
            this.state.error
            ? <Text style={styles.error}>Error al guardar la información</Text>
            : null
          }
          {
            this.state.errorEmpty
            ? <Text style={styles.error}>Por favor ingresa los datos.</Text>
            : null
          }
          {
            this.state.errorData
            ? <Text style={styles.error}>Aún no hay información</Text>
            : null
          }

          <TouchableOpacity 
            style={styles.btnCreate}
            onPress={() => this.validate()}
            disabled={this.state.disable}
          >
            <Text style={styles.createText}>Asignar</Text>
          </TouchableOpacity>
          {
            this.state.asignedGuards.map((guard, i) => (
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
                        <View style={styles.info}>
                          <Text style={styles.title}>Puesto: </Text>
                          <Text style={styles.name}>{guard.place}</Text>
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
          }
        </ScrollView>
        <View>
          <Dialog.Container visible={this.state.showDialog}>
          <Dialog.Title style={styles.dialogDescribre}>Fereg SR</Dialog.Title>
            <Dialog.Description style={styles.dialogDescribre}>
                Esta seguro que desea eliminar a este guardia.
              </Dialog.Description>
            <Dialog.Button label="Cancelar" color={COLORS.accent} onPress={()=>this.handleCancel()} />
          <Dialog.Button label="Confirmar" color={COLORS.darkPrimary} onPress={()=>{this.handleDelete()}} />
          </Dialog.Container>
        </View>
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
    marginBottom: 16
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
  card: {
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

export default AsignGuard;
