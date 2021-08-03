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
import CustomHeader from '../../../components/header';

class MasterMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={this.props.condominium.name}/>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ResidentList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/residents.png')}
                  />
                  <Text style={styles.name}>Residentes</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProviderList', {condominium: this.props.condominium})}>
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
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('InternalServiceList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/internalService.png')}
                  />
                  <Text style={styles.name}>Personal Interno</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HelpMenu', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/incidents.png')}
                  />
                  <Text style={styles.name}>Auxilio</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Call', {condominium: this.props.condominium , userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/call.png')}
                  />
                  <Text style={styles.name}>Llamar</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GuardWatch', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/guardWatch.png')}
                  />
                  <Text style={styles.name}>Rondines</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Guards', { condominium: this.props.route.params.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/guard.png')}
                  />
                  <Text style={styles.name}>Seguridad</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SuggestionList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/box.png')}
                  />
                  <Text style={styles.name}>Buzón</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('IncidentList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
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
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('VisitorList', {condominium: this.props.condominium})}>
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
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Invitation', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/visitants.png')}
                  />
                  <Text style={styles.name}>Invitaciones</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ExternalServiceList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/externalService.png')}
                  />
                  <Text style={styles.name}>Servicios Externos</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
          <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CheckList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/tasks.png')}
                  />
                  <Text style={styles.name}>Tareas</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ManagerList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/manager.png')}
                  />
                  <Text style={styles.name}>Administrador</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SupervisorList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/supervisor.png')}
                  />
                  <Text style={styles.name}>Supervisor</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('MessageList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/messages.png')}
                  />
                  <Text style={styles.name}>Lista de mensajes</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGray,
    paddingBottom: 50
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
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkGray,
  },
  button: {
    width: '100%',
  },
  card: {
    width: '45%',
    margin: 10,
    padding: 10, 
    backgroundColor: COLORS.darkGray,
  },
  icon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    alignSelf: 'center',
    color: COLORS.darkPrimary
  }
});

export default MasterMenu;
