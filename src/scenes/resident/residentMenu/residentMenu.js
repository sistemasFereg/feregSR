import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-shadow-cards';

class MainMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
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
                <Text style={styles.name}>Servicios externos</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('InternalService', {condominium: this.props.condominium})}>
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
                  source={require('../../../assets/images/icons/help.png')}
                />
                <Text style={styles.name}>Auxilio</Text>
              </View>
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CreateSuggestion', {condominium: this.props.condominium})}>
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
          <Card style={styles.card}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GuardWatch', {condominium: this.props.condominium})}>
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
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Guards', {condominium: this.props.condominium, userType: this.props.user.userType})}>
              <View>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/images/icons/guard.png')}
                />
                <Text style={styles.name}>Guardias</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
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
    alignSelf: 'center',
    color: COLORS.darkPrimary
  }
});


export default MainMenu;