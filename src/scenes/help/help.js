import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  SafeAreaView 
} from 'react-native';
import { Card } from 'react-native-shadow-cards';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <Card style={styles.card}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </Card>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 10, 
    margin: 10
  },
});

export default Help;
