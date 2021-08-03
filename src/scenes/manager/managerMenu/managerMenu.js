import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-shadow-cards';

class ManagerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ResidentList')}>
                <View>
                  <Ionicons name="person" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                  <Text style={styles.name}>Thandi</Text>
                </View>
              </TouchableOpacity>
            </Card>
            <Card style={styles.card}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('ProviderList')}>
                <View>
                  <Ionicons name="people-outline" color={COLORS.darkPrimary} size={100} style={styles.icon}/>
                  <Text style={styles.name}>Campanario</Text>
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
  },
  icon: {
    alignSelf: 'center'
  },
  name: {
    alignSelf: 'center',
    color: COLORS.darkPrimary
  }
});


export default ManagerMenu;