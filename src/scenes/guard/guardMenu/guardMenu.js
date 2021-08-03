import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-shadow-cards';

class GuardMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

// componentDidMount(){
//   console.log(this.props);
// }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('VisitorList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/invitation.png')}
                  />
                  <Text style={styles.name}>Visitantes</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProviderList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/providers.png')}
                  />
                  <Text style={styles.name}>Proveedores</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('QRCode', {condominium: this.props.condominium})}>
                <View>
                 <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/lectorQR.png')}
                  />
                  <Text style={styles.name}>Código QR</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GuardWatchCreate', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/guardWatch.png')}
                  />
                  <Text style={styles.name}>Iniciar Rondín</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('IncidentList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/incidents.png')}
                  />
                  <Text style={styles.name}>Incidentes</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UnadmittedList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/deny.png')}
                  />
                  <Text style={styles.name}>No permitidas</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HelpMenu', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/help.png')}
                  />
                  <Text style={styles.name}>Auxilio</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Call', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                 <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/call.png')}
                  />
                  <Text style={styles.name}>Llamar</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CreateSuggestion', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/box.png')}
                  />
                  <Text style={styles.name}>Crear Sugerencia</Text>
                </View>
              </TouchableOpacity>
            </Card>
            {/* <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CreateMessage', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/messages.png')}
                  />
                  <Text style={styles.name}>Crear Mensaje</Text>
                </View>
              </TouchableOpacity>
            </Card> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  cardContainer: {
    flexDirection: 'row'
  },
  button: {
    width: '100%',
  },
  card: {
    width: '45%',
    padding: 10, 
    margin: 10,
    backgroundColor: COLORS.darkGray
  },
  icon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    textAlign: 'center',
    color: COLORS.darkPrimary
  }
});


export default GuardMenu;