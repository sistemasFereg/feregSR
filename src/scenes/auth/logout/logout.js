import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import AuthService from '../../../services/auth';
import AuthContext from '../../../context/auth-context';

class Logout extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout() {
    const { context } = this;
    AuthService.logout()
      .then((response) => {
        if (response) context.setLogged(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.logout_text}>¿Estas seguro que quieres cerrar sesión?</Text>
        <TouchableOpacity 
          style={styles.confirmBtn}
          onPress={() => this.logout()}
        >
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.cancelBtn}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.darkGray,
    alignItems: 'center',
    paddingTop: 36
  },
  logout_text: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 24
  },
  confirmBtn: {
    width: "40%",
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.darkPrimary,
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  confirmText: {
    color: COLORS.darkPrimary,
  },
  cancelBtn: {
    width: "40%",
    backgroundColor: COLORS.accent,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  cancelText: {
    color: COLORS.white,
  },
});

export default Logout;