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

class CenterMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HelpMenu', {userType: this.props.user.userType})}>
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
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Call', {userType: this.props.user.userType})}>
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

export default CenterMenu;
