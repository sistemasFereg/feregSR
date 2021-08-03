import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Image,
  Linking
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import firebase from '../../../config/firebase'
import AuthContext from '../../../context/auth-context';
import AuthService from '../../../services/auth';

class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  login() {
    const { context } = this;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        AuthService.getFirebaseCurrentUser();
        context.setLogged(true);
      })
      .catch((error) => {
        console.log("erro",error)
        context.setLogged(false);
        if (error.toString().includes('badly')) {
          this.setState({ error: 'Ingres una dirección de email válida.' });
        } else if (error.toString().includes('invalid')) {
          this.setState({ error: 'La contraseña es invalida.' });
        } else {
          this.setState({ error: 'Error al iniciar sesión.' });
        }
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/logoFereg.png')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={COLORS.black}
            onChangeText={text => this.setState({email:text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput  
            style={styles.inputText}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor={COLORS.black}
            onChangeText={text => this.setState({password:text})}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('RecoverPassword')}
        >
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => this.login()}
        >
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>
        {
          this.state.error
            ? <Text style={styles.error}>{this.state.error}</Text>
            : null
        }
        {/* <TouchableOpacity>
          <Text style={styles.signupText}>Registrarse</Text>
        </TouchableOpacity> */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL('https://www.feregsp.com')}
          >
            <Text style={styles.text}>Fereg SP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {}}
          >
            <Text style={styles.text}>Aviso de privacidad</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor: COLORS.darkGray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    marginBottom: 16
  },
  logo: {
    flex: 1,
    aspectRatio: 1.5, 
    resizeMode: 'contain',
  },
  inputView: {
    width: "80%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: COLORS.black
  },
  forgot: {
    color: COLORS.darkPrimary,
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  loginText: {
    color: COLORS.primary,
  },
  signupText: {
    color: COLORS.darkPrimary
  },
  error: {
    textAlign: 'center',
    color: COLORS.error,
    marginTop: 8
  },
  btnContainer: {
    marginTop: '30%',
    width: '100%',
    flexDirection: 'row'
  },
  button: {
    width: '50%'
  },
  text: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
    fontSize: 15
  }
});

export default Login;
