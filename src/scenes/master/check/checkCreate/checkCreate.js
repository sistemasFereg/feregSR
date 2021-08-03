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
 } from 'react-native';
import { COLORS } from '../../../../assets/styles/variables';
import firebase from '../../../../config/firebase';
import CustomHeader from '../../../../components/header';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class CheckCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: [],
      name: '',
      description: '',
      initDate: null,
      guardName: '',
      DatePickerVisibility: false,
      error: false,
      errorData: false,
      disable: false,
    };
  }

  componentDidMount() {
    if(this.props.check) {
      this.setState({ check: this.props.check });
      this.setState({ name: this.props.check.name });
      this.setState({ description: this.props.check.description });
      this.setState({ initDate: this.props.check.initDate });
      this.setState({ guardName: this.props.check.guardName });
    }
  }

  validate() {
    const {name, description, initDate, guardName} = this.state;
    if(name.trim().length == 0){
      this.nameInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(description.trim().length == 0){
      this.descriptionInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(initDate.trim().length == 0){
      this.dateInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    }
    if(name.trim().length != 0 && description.trim().length != 0 && initDate.trim().length != 0) {
      this.createCheck();
      this.setState({errorData: false});
    }
    else{
      this.setState({errorData: true});
    }
  }

  createCheck() {
    var checkId = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++) {
      checkId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.setState({ disable: true });
    firebase.firestore().collection("condominium").doc(`${this.props.route.params.condominium.name}`).collection("check").doc(checkId).set({
      checkNum: checkId,
      name: this.state.name,
      description: this.state.description,
      initDate: this.state.initDate,
      guardName: '',
      isDone: false,
    }).then((res) => {
      this.setState({ disable: false });
      this.setState({
        name: '',
        description: '',
        initDate:'',
        guardName: '',
        isDone: '',
      });
      Alert.alert("Fereg Sr","Tarea creada exitosamente")
      this.setState({error: false});
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({error: true});
      this.setState({ disable: false });
    });
  }

  showDatePicker = () => {
    this.setState({DatePickerVisibility: true});
  };
  
  hideDatePicker = () => {
    this.setState({DatePickerVisibility: false});
  };

  handleConfirm = (date) => {
    this.setState({initDate: moment(date).format('DD-MM-YYYY - HH:mm')});
    this.hideDatePicker();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Crear Tarea'}/>
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
          <View style={styles.commentView} ref={r=>this.descriptionInput=r}>
            <TextInput  
              style={styles.commentText}
              placeholder="Descripción (Lim. 150)" 
              placeholderTextColor={COLORS.black}
              multiline = {true}
              numberOfLines = {4}
              maxLength = {150}
              onChangeText={text => this.setState({description:text})}
              value={this.state.description}
            />
          </View>
          <View style={styles.dateContainer}>
            <DateTimePickerModal
              date = {new Date()}
              isDarkModeEnabled={true}
              isVisible={this.state.DatePickerVisibility}
              mode="datetime"
              // display='inline'
              format = 'DD-MM-YYYY - HH:mm'
              onConfirm={(date) => this.handleConfirm(date)}
              onCancel={() => this.hideDatePicker()}
            />
            {
              this.state.initDate
              ? <Text style={styles.dateText}>{this.state.initDate}</Text>
              : <Text style={styles.dateText}>--</Text>
            }
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => this.showDatePicker()}
            >
              <AntDesign
              name="calendar"
              size={24}
              color={COLORS.primary}
              />
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
  commentText: {
    height: 150,
    color: COLORS.black
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
    marginBottom: 40
  },
  createText: {
    color: COLORS.primary,
  },
  error: {
    textAlign: 'center',
    color: COLORS.error,
    marginTop: 8
  },
  scroll: {
    paddingTop: 16,
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
     alignSelf: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dateButton: {
    marginLeft: 20
  }
});

export default CheckCreate;
