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
import { COLORS } from '../../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-shadow-cards';

class CondominiumMenu extends Component {

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
        <ScrollView>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ResidentList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/residents.png')}
                  />
                  {/* <Ionicons name="person" color={COLORS.darkPrimary} size={100} style={styles.icon}/> */}
                  <Text style={styles.name}>Residentes</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProviderList', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/providers.png')}
                  />
                  {/* <Ionicons name="people-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/> */}
                  <Text style={styles.name}>Proveedores</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('InternalServiceList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/internalService.png')}
                  />
                  {/* <Ionicons name="ios-people" color={COLORS.darkPrimary} size={100} style={styles.icon}/> */}
                  <Text style={styles.name}>Personal Interno</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HelpMenu', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/help.png')}
                  />
                  {/* <Ionicons name="ios-warning" color={COLORS.darkPrimary} size={100} style={styles.icon}/> */}
                  <Text style={styles.name}>Auxilio</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Call', {condominium: this.props.condominium, userType: this.props.user.userType})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/call.png')}
                  />
                  <Text style={styles.name}>Llamar</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GuardWatch', {condominium: this.props.condominium, user: this.props.user})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/guardWatch.png')}
                  />
                  <Text style={styles.name}>Rondines</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Guards', { condominium: this.props.route.params.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/guard.png')}
                  />
                  <Text style={styles.name}>Seguridad</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CreateSuggestion', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/box.png')}
                  />
                  <Text style={styles.name}>Crear Sugerencia</Text>
                </View>
              </TouchableOpacity>
            </Card>
          </View>
          <View style={styles.cardContainer}>
            {/* <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('IncidentList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/incidents.png')}
                  />
                  <Text style={styles.name}>Incidentes</Text>
                </View>
              </TouchableOpacity>
            </Card> */}
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UnadmittedList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../../assets/images/icons/deny.png')}
                  />
                  <Text style={styles.name}>Personas no permitidas</Text>
                </View>
              </TouchableOpacity>
            </Card>
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


export default CondominiumMenu;