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

class SupervisorMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // console.log('Menu: ', this.props.user.userType)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.route.params.condominium.name}</Text>
        </View>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AsignGuard', {condominium: this.props.route.params.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/guard.png')}
                  />
                  <Text style={styles.name}>Personal</Text>
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
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HelpMenu')}>
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
            {/* <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CreateSuggestion', {condominium: this.props.condominium})}>
                <View>
                  <Ionicons name="mail" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                  <Text style={styles.name}>Supervisor</Text>
                </View>
              </TouchableOpacity>
            </Card> */}
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('CheckList', {condominium: this.props.condominium})}>
                <View>
                  <Image
                    style={styles.icon}
                    source={require('../../../assets/images/icons/tasks.png')}
                  />
                  <Text style={styles.name}>Check List</Text>
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


export default SupervisorMenu;