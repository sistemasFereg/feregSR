import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// Styles
import styles from './styles';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      isLoading: nextProps.isLoading
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.modalBackground}>
        <StatusBar barStyle="light-content" />
        <View style={styles.imageContainer}>
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{
              textAlign: 'center',
              textAlignVertical: 'auto',
              minHeight: '100%',
              height: '100%'
            }}
          >
            <Image
              source={require('../../assets/images/logoFereg.png')}
              style={styles.image}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </Animatable.Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Loader;
