import firebase from 'firebase'
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';

class AuthService {
  /**
   * Gets the user logged in the application with Firebase
   */
  static async getFirebaseCurrentUser() {
    // console.log("getToken :>> ");
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);
      // console.log("Firebase token :>> ", token);
      this.setToken(token);
      this.refreshFirebaseSession();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Update the current session because Firebase token
   * expiration time is 1 hr.
   */
  static refreshFirebaseSession() {
    setTimeout(() => {
      this.getFirebaseCurrentUser();
    }, 3000000);
  }

  static async getExpoToken() {
    return (await Notifications.getExpoPushTokenAsync()).data;
  }

  /**
   * @param {Object} token - The session token to be stored
   */
  static async setToken(token) {
    // console.log('auth token :>> ',token);
    return SecureStore.setItemAsync('token', token);
  }

  static async getToken() {
    return SecureStore.getItemAsync('token');
  }

  static async deleteToken() {
    console.log('auth DELTE token :>> ');
    return SecureStore.deleteItemAsync('token');
  }

  static async recoverPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * Function to handle logout, delete token, and close session from firebase
  */
  static async logout() {
    try {
      await firebase.auth().signOut();
      await SecureStore.deleteItemAsync('token');
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default AuthService;
