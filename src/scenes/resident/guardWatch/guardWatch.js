import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { COLORS } from '../../../assets/styles/variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../components/header';

class GuardWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'Rondines'}/>
        <ScrollView style={styles.scroll}>
          <Card style={styles.card}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('GuardWatch')}>
              <View style={styles.cardContent}>
                <Ionicons name="md-walk" color={COLORS.darkPrimary} size={50} style={styles.icon}/>
                <View style={styles.cardText}>
                  <View style={styles.info}>
                    <Text style={styles.title}>Guardia: </Text>
                    <Text style={styles.name}>Homero Higareda Morales</Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.title}>Fecha inicio: </Text>
                    <Text style={styles.name}>12/12/12, 17:00</Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.title}>Fecha fin: </Text>
                    <Text style={styles.name}>12/12/12, 20:00</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        </ScrollView>
        
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
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
    color: COLORS.darkPrimary,
    marginTop: 5
  },
  cardText: {
    flexDirection: 'column',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 5
  },
  title: {
    color: COLORS.darkPrimary,
    marginLeft: 16
  },
  name: {
    marginLeft: 8
  },
  description: {
    marginLeft: 16
  }
});

export default GuardWatch;
