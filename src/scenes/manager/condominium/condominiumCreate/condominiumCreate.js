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
import { COLORS } from '../../../../assets/styles/variables';
import firebase from '../../../../config/firebase';
import CustomHeader from '../../../../components/header/index';


class CreateCondominium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condominium: [],
      name: '',
      managerNum: '',
      managerEmail: '',
      supNum: '',
      supEmail: '',
      error: false,
      errorDat: false
    };
  }

  componentDidMount() {
    if(this.props.condominium) {
      this.setState({ condominium: this.props.condominium });
      this.setState({ name: this.props.condominium.name });
      this.setState({ managerNum: this.props.condominium.managerNum });
      this.setState({ managerEmail: this.props.condominium.managerEmail });
      this.setState({ supNum: this.props.condominium.supNum });
      this.setState({ supEmail: this.props.condominium.supEmail });
    }
  }

  validate() {
    const {name, managerNum, managerEmail, supNum, supEmail} = this.state;
    if(name.trim().length == 0){
      this.nameInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(managerNum.trim().length == 0){
      this.managerNumInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(managerEmail.trim().length == 0){
      this.managerEmailInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(supNum.trim().length == 0){
      this.supNumInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(supEmail.trim().length == 0){
      this.supEmailInput.setNativeProps({
        borderColor: COLORS.accent,
        borderWidth:1
      });
    } 
    if(name.trim().length != 0 && managerNum.trim().length && managerEmail.trim().length && supNum.trim().length && supEmail.trim().length) {
      this.createCondominium();
    }
    else{
      this.setState({ errorData: true });
    }
  }

  createCondominium() {
    firebase.firestore().collection('condominium').doc(`${this.state.name}`).set({
      name: this.state.name,
      managerNum: this.state.managerNum,
      managerEmail: this.state.managerEmail,
      supNum: this.state.supNum,
      supEmail: this.state.supEmail
    }).then((res) => {
      this.setState({ 
        name: '',
        managerNum: '',
        managerEmail: '',
        supNum: '',
        supEmail: ''
      })
      Alert.alert('Fereg RS', 'Haz creado un nuevo condominio');
      this.setState({
        name: '',
        managerNum: '',
        managerEmail: '',
        supNum: '',
        supEmail: ''
      })
    })
    .catch((err) => {
      console.error("Error found: ", err);
      this.setState({ error: true });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={"Crear Condominio"}/>
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
          <View style={styles.inputView} ref={r=>this.managerNumInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Id del administrador" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({managerNum:text})}
              value={this.state.managerNum}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.managerEmailInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Email del administrador" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({managerEmail:text})}
              value={this.state.managerEmail}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.supNumInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Id del supervisor" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({supNum:text})}
              value={this.state.supNum}
            />
          </View>
          <View style={styles.inputView} ref={r=>this.supEmailInput=r}>
            <TextInput  
              style={styles.inputText}
              placeholder="Email del supervisor" 
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({supEmail:text})}
              value={this.state.supEmail}
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
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.darkGray,
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
  scroll:{
    paddingTop: 16,
  }
});

export default CreateCondominium;
