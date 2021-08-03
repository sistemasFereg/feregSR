import React from 'react';
import { WebView } from 'react-native-webview';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { COLORS } from '../../assets/styles/variables';

class Call extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      ice_connection_state: '',
      pendingCandidates: []
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.condominium && this.props.userType != 'center'
          ? <WebView 
              style={{flex: 1, backgroundColor: COLORS.darkGray}}
              source={{ uri: `https://fereg-sr.web.app/#/preview?condominium=${this.props.condominium.name}&userType=${this.props.userType}`}}/>
          : <WebView 
              style={{flex: 1, backgroundColor: COLORS.darkGray}}
              source={{ uri: `https://fereg-sr.web.app/#/meeting?link=${this.props.route.params.link}`}}/>
        }
        {
          this.props.userType === 'center'
          ? <WebView 
              style={{flex: 1, backgroundColor: COLORS.darkGray}}
              source={{ uri: `https://fereg-sr.web.app/#/preview?userType=${this.props.userType}`}}/>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
});

export default Call;
