import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';

class GuardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.header}>Guardias</Text>
          <Card style={styles.card}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GuardProfile')}>
              <View style={styles.cardContent}>
                <Ionicons name="person" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                <View style={styles.cardText}>
                  <Text style={styles.title}>Homero Higareda Morales</Text>
                  <Text style={styles.description}>Supervisor</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
        
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  header: {
    textAlign: 'center',
    color: COLORS.darkPrimary,
    fontSize: 20
  },
  card: {
    width: '95%',
    padding: 10, 
    margin: 10
  },
  cardContent: {
    flexDirection: 'row',
  },
  icon: {
    color: COLORS.darkPrimary
  },
  cardText: {
    flexDirection: 'column',
  },
  title: {
    color: COLORS.darkPrimary,
    marginLeft: 16
  },
  description: {
    marginLeft: 16
  }
});

export default GuardsList;
