import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../assets/styles/variables.js';
import AuthService from '../../services/auth';
import CustomHeader from '../../components/header/index';

class RecoverPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isValid: true,
      emailValid: true,
      emailSend: false,
      error: ''
    };
  }

  validate = () => {
    if(this.state.email == '') {
      this.setState({isValid: false});
    }
    else {
      this.setState({isValid: true});
      this.recoverPassword();
    } 
  }

  /**
   * Get's selected value from custom input text
   * @param {string} value
   * @param {string} inputName
   */
  getInputValue = (value, inputName) => {
    if(inputName == 'Email'){
      this.validateEmail(value)
    }
  }

  /**
   * Send recover password email
   * @param {string} email
   */
  recoverPassword = () => {
    AuthService.recoverPassword(this.state.email)
      .then(response => {
        this.setState({ emailSend: true })
      })
      .catch(error => {
        this.setState({ error: 'Hubo un error al enviar el correo.'})
      });
  }

  validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      this.setState({ emailValid : false });
      return false;
    }
    else {
      this.setState({ emailValid : true });
      this.setState({ email: email});
      this.validate();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <CustomHeader title={'Recuperar Contraseña'}/>
        <ScrollView style={styles.scroll}>
          <Text style={styles.text}>Te enviaremos un correo para recuperar tu contraseña.</Text>
          <View style={styles.inputView}>
            <TextInput  
              style={styles.inputText}
              placeholder="Email" 
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={COLORS.black}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <TouchableOpacity 
            style={styles.sendBtn}
            onPress={() => this.validateEmail()}
          >
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
          {
            !this.state.emailValid ?
              <Text style={styles.error}>Ingresa un email valido</Text>
            : null
          }
          {
            !this.state.error ?
              <Text style={styles.error}>{this.state.error}</Text>
            : null
          }

          {
            this.state.emailSend
            ? <View>
                <Text style={styles.title}>¡Correo enviado!</Text>
                <Text style={styles.text}>Por favor revisa tu bandeja de entrada.</Text>
              </View>
            : null
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  container: {
    backgroundColor: COLORS.darkGray,
    marginTop: 32,
    padding: 10
  },
  getBackText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkPrimary,
    marginBottom: 24
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 12
  },
  inputView: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: COLORS.black
  },
  title: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
    fontSize: 24,
    marginBottom: 12,
    marginTop: 12
  },
  error: {
    textAlign: 'center',
    color: '#cc0031',
    marginTop: 8
  },
  sendBtn: {
    width: "80%",
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  sendText: {
    color: COLORS.white,
  },
});

export default RecoverPassword;